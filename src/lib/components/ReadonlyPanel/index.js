import { useEffect, useState } from 'react';
import { getRecord } from '../Grid/crud-helper';
import { useRouter } from '../useRouter/StateProvider';

const ReadonlyPanel = ({ apiEndpoint, model, onDataFetched }) => {
    const { useParams } = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve `id` with a default fallback value
    const { id: idWithOptions } = useParams() || {};
    const id = idWithOptions || 11; // Default to 11 if idWithOptions is not available

    const setActiveRecord = ({ id, title, record, lookups }) => {
        onDataFetched({ record, lookups });
    };
    const fetchData = async () => {
        try {
            await getRecord({
                api: apiEndpoint,
                modelConfig: model,
                setIsLoading,
                setActiveRecord,
                id
            });

        } catch (err) {
            setError('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [apiEndpoint, model, onDataFetched, id]);
};

export default ReadonlyPanel;
