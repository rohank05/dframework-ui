import { useEffect, useState } from 'react';
import { getRecord } from '../Grid/crud-helper';
import { useRouter } from '../useRouter/StateProvider';

const ReadonlyPanel = ({ apiEndpoint, model, onDataFetched }) => {
    const { navigate, getParams, useParams, pathname } = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lookups, setLookups] = useState(null);

    // Retrieve `id` with a default fallback value
    const { id: idWithOptions } = useParams() || {};
    const id = idWithOptions || 11; // Default to 11 if idWithOptions is not available

    const setActiveRecord = ({ id, title, record, lookups }) => {
        setData(record);
        setLookups(lookups);
        onDataFetched(record);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recordData = await getRecord({
                    api: apiEndpoint,
                    modelConfig: model,
                    setIsLoading,
                    setActiveRecord,
                    id,
                });
                setData(recordData);
                onDataFetched(recordData);
            } catch (err) {
                setError('Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [apiEndpoint, model, onDataFetched, id]);
};

export default ReadonlyPanel;
