import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button, Chip } from '@mui/material';

type ObjectPropertyType = {
    [key: string]: string | number;
};

type EnhancedTableType<T> = {
    rowsProp: { [key: string]: T };
};

function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: string, orderBy: string) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array: any[], comparator: any) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const objLabelByKey: { [key: string]: string } = {
    front_default: 'Foto',
    id: 'Número en Pokedex',
    name: 'Nombre',
    types: 'Tipos',
    friends: 'Amigos',
    height: 'Altura',
    weight: 'Peso',
    description: 'descripcion',
};

function EnhancedTableHead(props: any) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        rowsKeys,
    } = props;
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {rowsKeys.map((headCell: any) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

const EnhancedTableToolbar = ({
    handleDelete,
    numSelected,
}: {
    numSelected: any;
    handleDelete: () => void;
}) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    POKEMONS
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete" onClick={handleDelete}>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const TableCellByValue = ({
    value,
    labelId,
}: {
    value: string | number | unknown;
    labelId: string;
}) => {
    const isArray = Array.isArray(value) && value.length > 0;

    if (isArray) {
        const allTypes = value.map((type) => ({ typeName: type }));

        return (
            <TableCell
                component="td"
                scope="row"
                padding="normal"
                align="left"
                id={labelId}
            >
                <ul className="tableCellTypeList">
                    {allTypes.map(({ typeName }) => (
                        <li key={typeName}>
                            <Chip label={typeName} />
                        </li>
                    ))}
                </ul>
            </TableCell>
        );
    } else if (typeof value === 'string') {
        const isImg = value.includes('https');

        return isImg ? (
            <TableCell
                component="td"
                id={labelId}
                scope="row"
                padding="none"
                align="left"
            >
                <img src={value} alt={`Pokemon`} height={60} width={60} />
            </TableCell>
        ) : (
            <TableCell
                component="td"
                id={labelId}
                scope="row"
                padding="normal"
                align="left"
            >
                {value}
            </TableCell>
        );
    } else {
        return (
            <TableCell
                component="td"
                id={labelId}
                scope="row"
                padding="normal"
                align="left"
            >
                {(value as number).toString()}
            </TableCell>
        );
    }
};

export default function EnhancedTable({
    rowsProp,
    handleEditButton,
    handleDeleteElement,
}: {
    rowsProp: EnhancedTableType<ObjectPropertyType>[];
    handleEditButton: any;
    handleDeleteElement: (elementsName: string[]) => void;
}) {
    const [rows, setRows] = useState(rowsProp);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState<never[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: any) => n.name);
            setSelected(newSelecteds as never);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: any, name: never) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: never[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: any) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: never) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const getRowsKeys = (rows: EnhancedTableType<ObjectPropertyType>[]) => {
        const areRowsValid = Array.isArray(rows) && rows.length > 0;

        if (areRowsValid) {
            const getRowKeys = Object.keys(rows[0]);

            return getRowKeys.map((row) => ({
                id: row,
                label: objLabelByKey[row],
                idCreated: row,
            }));
        }

        return [];
    };

    const handleDelete = () => {
        console.log(selected);
        handleDeleteElement(selected);
        setSelected([]);
    };

    useEffect(() => {
        setRows(rowsProp);
    }, [JSON.stringify(rowsProp)]);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    handleDelete={handleDelete}
                    numSelected={selected.length}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            rowsKeys={getRowsKeys(rows)}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row: any, index: any) => {
                                    const isItemSelected = isSelected(
                                        row.name as never
                                    );
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => {
                                                handleClick(
                                                    event,
                                                    row.name as never
                                                );
                                            }}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>

                                            {Object.keys(row).map((key) => (
                                                <TableCellByValue
                                                    key={key}
                                                    value={row[key] as unknown}
                                                    labelId={labelId}
                                                />
                                            ))}

                                            <TableCell
                                                padding="normal"
                                                component={'td'}
                                            >
                                                <Button
                                                    type={'button'}
                                                    variant={'contained'}
                                                    onClick={handleEditButton(
                                                        row
                                                    )}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
        </Box>
    );
}
