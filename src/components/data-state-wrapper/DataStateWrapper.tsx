import { Center, Loader } from "@mantine/core";
import Nodata from "../no-data/Nodata";

type TProps = {
    isLoading?: boolean;
    isError?: boolean;
    isEmpty?: boolean;
    loadingComponent?: React.ReactNode;
    noDataComponent?: React.ReactNode;
    children: React.ReactNode;
};

export function DataStateWrapper({ isLoading, isError, isEmpty, loadingComponent, noDataComponent, children }: TProps) {
    if (isLoading)
        return (
            loadingComponent || (
                <Center>
                    <Loader />
                </Center>
            )
        );

    if (isError || isEmpty)
        return (
            noDataComponent || (
                <Center>
                    <Nodata />
                </Center>
            )
        );

    return <>{children}</>;
}
