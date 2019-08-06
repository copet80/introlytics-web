import React from 'react';
import classNames from 'classnames';
import './style.scss';

import {
  Table,
  Pagination,
  Container,
  Row,
  Col,
  Dropdown,
} from 'react-bootstrap';

import StarRating from '../StarRating';
import { formatNumber } from '../../utils/number';
import { createArrayIndices } from '../../utils/array';

export default class ContactList extends React.Component {
  static defaultProps = {
    pageIndex: 0,
    rowsPerPage: 10,
    sortColumn: 'connectionRating',
    sortDir: 'desc',
    sortDataType: 'number',
  };

  state = {
    pageIndex: this.props.pageIndex,
    rowsPerPage: this.props.rowsPerPage,
    sortColumn: this.props.sortColumn,
    sortDir: this.props.sortDir,
    sortDataType: this.props.sortDataType,
  };

  changeTablePageIndex = (index) => {
    const { data } = this.props;
    const { rowsPerPage } = this.state;
    const maxPageIndex = Math.ceil(data.length / rowsPerPage) - 1;

    let pageIndex = Math.max(index, 0);
    pageIndex = Math.min(pageIndex, maxPageIndex);
    this.setState({ pageIndex });
  };

  sortColumn = (columnName, dataType) => {
    this.setState(({ sortColumn, sortDir }) => {
      if (sortColumn === columnName) {
        return {
          sortDir: sortDir !== 'desc' ? 'desc' : 'asc',
          sortDataType: dataType,
        };
      }

      return {
        sortColumn: columnName,
        sortDataType: dataType,
      };
    });
  };

  sortData = (a, b) => {
    const { sortDir, sortColumn, sortDataType } = this.state;
    let va = a[sortColumn];
    let vb = b[sortColumn];

    switch (sortDataType) {
      case 'number':
        va = parseFloat(va);
        vb = parseFloat(vb);
        break;

      case 'string':
        va = `${va}`;
        vb = `${vb}`;
        break;

      default:
        // do nothing
        break;
    }

    if (sortDir === 'desc') {
      if (va < vb) return 1;
      else if (va > vb) return -1;
      else return 0;
    } else {
      if (va < vb) return -1;
      else if (va > vb) return 1;
      else return 0;
    }
  };

  handleRowClick = (rowData) => {
    const { onRowClick } = this.props;
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  renderRows() {
    const { data } = this.props;
    const { pageIndex, rowsPerPage } = this.state;

    if (data && data.length) {
      return [...data]
        .sort(this.sortData)
        .splice(pageIndex * rowsPerPage, rowsPerPage)
        .map((rowData) => {
          const { email, conversationsCount, connectionRating } = rowData;
          return (
            <tr key={email} onClick={() => this.handleRowClick(rowData)}>
              <td>{email}</td>
              <td className="text-right">{formatNumber(conversationsCount)}</td>
              <td className="text-center">
                <StarRating rating={connectionRating} />
              </td>
            </tr>
          );
        });
    }

    return (
      <tr key="no-data">
        <td colSpan={3}>There are no contacts found.</td>
      </tr>
    );
  }

  renderPagination() {
    const { data } = this.props;
    const { pageIndex, rowsPerPage } = this.state;
    const maxPageIndex = Math.ceil(data.length / rowsPerPage);

    if (data && data.length) {
      return (
        <Container>
          <Row>
            <Col />
            <Col>
              <Pagination>
                <Pagination.Prev
                  className="prev"
                  onClick={() => this.changeTablePageIndex(pageIndex - 1)}
                />
                <li>
                  <Dropdown>
                    <Dropdown.Toggle>
                      {formatNumber(pageIndex + 1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {createArrayIndices(0, maxPageIndex).map((index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => this.changeTablePageIndex(index)}
                        >
                          {formatNumber(index + 1)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <Pagination.Next
                  className="next"
                  onClick={() => this.changeTablePageIndex(pageIndex + 1)}
                />
              </Pagination>
            </Col>
            <Col />
          </Row>
        </Container>
      );
    }
    return null;
  }

  render() {
    const { sortColumn, sortDir } = this.state;

    return (
      <div className="ContactList">
        <Table responsive hover>
          <thead>
            <tr>
              <th
                className={classNames(
                  'sortable',
                  sortColumn === 'email' && 'sorting',
                  sortDir === 'desc' && 'desc',
                )}
                onClick={() => this.sortColumn('email', 'string')}
              >
                Email
              </th>
              <th
                className={classNames(
                  'text-right',
                  'sortable',
                  sortColumn === 'conversationsCount' && 'sorting',
                  sortDir === 'desc' && 'desc',
                )}
                onClick={() => this.sortColumn('conversationsCount', 'number')}
              >
                Conversations
              </th>
              <th
                className={classNames(
                  'text-center',
                  'sortable',
                  sortColumn === 'connectionRating' && 'sorting',
                  sortDir === 'desc' && 'desc',
                )}
                onClick={() => this.sortColumn('connectionRating', 'number')}
              >
                Connection
              </th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </Table>
        {this.renderPagination()}
      </div>
    );
  }
}
