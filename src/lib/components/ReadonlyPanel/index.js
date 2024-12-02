import { useEffect, useState } from 'react';
import { getRecord } from '../Grid/crud-helper';
import { useRouter, useStateContext } from '../useRouter/StateProvider';

const ReadonlyPanel = ({ apiEndpoint, model, onDataFetched }) => {
    const { useParams } = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { stateData } = useStateContext();

    // Retrieve `id` with a default fallback value
    const { id: idWithOptions } = useParams() || {};
    const id = idWithOptions || 11; // Default to 11 if idWithOptions is not available

    const setActiveRecord = ({ id, title, record, lookups }) => {
        onDataFetched(record);
    };
    const fetchData = async (gridApi) => {
        try {
            await getRecord({
                api: gridApi,
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
        const url = stateData?.gridSettings?.permissions?.Url || "";
        let gridApi = `${url}${model.api}`;
        fetchData(gridApi);
    }, [apiEndpoint, model, onDataFetched, id, fetchData, JSON.stringify(stateData)]);
};

export default ReadonlyPanel;
