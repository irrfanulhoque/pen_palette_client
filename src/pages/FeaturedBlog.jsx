import React, { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';
import { Helmet } from 'react-helmet-async';

const FeaturedBlogs = () => {
    const blogs = useLoaderData();
    const validBlogs = useMemo(() => blogs.filter(blog => blog.description), [blogs]);

    const topBlogs = useMemo(
        () => validBlogs
            .sort((a, b) => b.description.split(' ').length - a.description.split(' ').length)
            .slice(0, 10),
        [validBlogs]
    );

    const data = useMemo(
        () => topBlogs.map(blog => ({
            title: blog.title || 'N/A',
            category: blog.category || 'N/A',
            wordCount: blog.description ? blog.description.split(' ').length : 0,
            author: blog.author || 'N/A',
        })),
        [topBlogs]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'Word Count',
                accessor: 'wordCount',
            },
            {
                Header: 'Author',
                accessor: 'author',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    return (
        <div className="featured-blogs-page bg-white py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>PenPalette | Featured</title>
            </Helmet>
            <h1 className="text-3xl font-semibold text-center text-black mb-8">Featured Blogs</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
                <table {...getTableProps()} className="min-w-full table-auto border-collapse">
                    <thead className="bg-black text-white">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="px-4 py-3 text-left border-b cursor-pointer"
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-4 py-3 border-b text-black">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeaturedBlogs;
