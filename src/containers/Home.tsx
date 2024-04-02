import EnhancedTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { usePokemons } from '../hooks/usePokemons';

export default function Home({ tableRows }: { tableRows: any }) {
    const { isLoading, data, error } = usePokemons();

    const navigate = useNavigate();

    const handleEditButton = (row: any) => (e: any) => {
        e.stopPropagation();
        const {
            html_image,
            html_types,
            html_my_sprite,
            html_my_types,
            html_my_teammates,
            ...params
        } = row;
        // ! NAVIGATE NOT ACCEPT HTML PARAMS
        navigate(`form/${row.name}`, {
            state: { ...params },
        });
    };

    return (
        <div>
            {isLoading && data.length === 0 ? (
                'Loading...'
            ) : (
                <EnhancedTable
                    rowsProp={data}
                    handleEditButton={handleEditButton}
                />
            )}
        </div>
    );
}
