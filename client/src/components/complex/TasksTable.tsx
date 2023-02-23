import * as React from 'react';
import { DataGrid, GridColDef, GridEventListener, GridRowsProp  } from '@mui/x-data-grid';
import { ClassService } from '../../http/classAPI';
import { IRealClass } from '../../models/class.model';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../router';
import { useTypedSelector } from '../../hooks/useTypedSelector';


interface TasksTableProps {
    masterClass: IRealClass;
}


export function TasksTable(props: TasksTableProps) {
    const [list, setList] = React.useState([]);

    const navigate = useNavigate();
    const { user } = useTypedSelector(state => state.user);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await ClassService.getClassWorks(props.masterClass.id);
            console.log(data.data)
            setList(data.data)
        }

        fetchData()
    }, [])

    const columns: GridColDef[] = [
        {field: 'index', headerName: '№', flex: 0.1},
        {field: 'name', headerName: 'Название', flex: 0.3},
        {field: 'author', headerName: 'Автор', flex: 0.2},
        {field: 'class', headerName: 'Класс', flex: 0.2},
        {field: 'difficulty', headerName: 'Сложность', flex: 0.2},
    ]

    //@ts-ignore
    const rows: GridRowsProp = list.map(e => {return {id: e.id, index: e.id, name: e.Name, author: 'Me', class: e.Class, difficulty: e.Difficulty}})

    const handleClick: GridEventListener<'rowClick'> = (params, event, details) => {
        console.log(params)
        console.log(event)
        console.log(details)
        const route = user.user.Role === 'Student' ? `${RoutesEnum.TASK_VIEW}?id=${params.id}` : `${RoutesEnum.WORK_ANALYSIS}?id=${params.id}`;
        navigate(route, {state: {classId: params.id}})
    }

    return (
        <DataGrid onRowClick={handleClick} rows={rows} columns={columns} sx={{marginTop: '2%', height: '100%'}} />
    )
}