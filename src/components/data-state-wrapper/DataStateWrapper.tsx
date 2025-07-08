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
                <Center sx={{ width: "100%", height: "100%", flex: 1 }}>
                    <Loader />
                </Center>
            )
        );

    if (isError || isEmpty)
        return (
            noDataComponent || (
                <Center sx={{ width: "100%", height: "100%", flex: 1 }}>
                    <Nodata />
                </Center>
            )
        );

    return <>{children}</>;
}
