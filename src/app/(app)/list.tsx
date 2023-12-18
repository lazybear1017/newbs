import { Text, View } from "react-native";
import { useSession } from "@/hooks/ctx";
import { useEffect } from "react";
import { useRequest } from "ahooks";
import { fetchMonitorPage } from "@/services";
import { DataTable } from "react-native-paper";
import { useState } from "react";

export default function List() {
  const { signOut, session } = useSession() || {};

  console.log(session);

  const { data, loading, run } = useRequest(fetchMonitorPage, { manual: true });
  const tData = data?.data.list || [];

  useEffect(() => {
    run(
      { viewIndex: 1, viewSize: 100 },
      { pid: "1717092929898491906" },
      session
    );
  }, []);

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tData.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>学号</DataTable.Title>
        <DataTable.Title numeric>专业</DataTable.Title>
        <DataTable.Title numeric>当前阶段</DataTable.Title>
      </DataTable.Header>

      {tData.slice(from, to).map((item: any) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.sno}</DataTable.Cell>
          <DataTable.Cell numeric>{item.mname}</DataTable.Cell>
          <DataTable.Cell numeric>{item.curItem}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(tData.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${tData.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"页码"}
      />
    </DataTable>
  );
}
