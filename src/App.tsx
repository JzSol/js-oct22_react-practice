import React from 'react';
import './App.scss';
// import cn from 'classnames';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categoriesFromServer from './api/categories';

// interface User {
//   id: number;
//   name: string;
//   sex: 'f' | 'm';
// }

// interface Product {
//   id: number;
//   name: string;
//   categoryId: number;
// }

// interface Category {
//   id: number;
//   title: string;
//   ownerId: number;
// }

// const products = [...productsFromServer];

export const App: React.FC = () => {
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // const handleUserClick = (userId: number) => {
  //   setSelectedUserId(userId);
  // };

  // const handleSelectAllClick = () => {
  //   setSelectedUserId(null);
  // };

  // const filteredProducts = selectedUserId
  //   ? products.filter((product) => product.ownerId === selectedUserId)
  //   : products;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a data-cy="FilterAllUsers" href="#/">
                All
              </a>

              {usersFromServer.map((user) => (
                <a key={user.id} data-cy="FilterUser" href="#/">
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categoriesFromServer.map((category) => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {productsFromServer.map((product) => {
                const productCategory = categoriesFromServer.filter(
                  (category) => category.id === product.id,
                );
                const productUser = usersFromServer.filter(
                  (user) => user.id === product.id,
                );

                return (
                  <tr key={product.id} data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>
                    <td data-cy="ProductName">{product.name}</td>
                    {productCategory.length > 0 ? (
                      productCategory.map((category) => (
                        <td key={category.id} data-cy="ProductCategory">
                          {category.icon}
                          -
                          {category.title}
                        </td>
                      ))
                    ) : (
                      <td>No category</td>
                    )}

                    {productUser.length > 0 ? (
                      productUser.map((user) => (
                        <td
                          key={user.id}
                          data-cy="ProductUser"
                          className="has-text-link"
                        >
                          {user.name}
                        </td>
                      ))
                    ) : (
                      <td>No user</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
