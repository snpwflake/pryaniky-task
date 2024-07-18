import { createContext, useEffect, useState } from "react";
import BasicTable from "../UI/Table";
import fetchUserDocs from "../../services/UserDocs";
import { ISO, UserDocs } from "../../models/userDocs";
import useAuthToken from "../../hooks/useAuth";
import { Column } from "../../models/table";
import ButtonChange from "../UI/ChangeButton";

const columns: Column[] = [
  {
    id: "options",
    label: "",
    minWidth: 32,
    align: "center",
    format: (_: any, row: UserDocs) => {
      return <ButtonChange data={row} />;
    },
  },
  { id: "id", label: "Номер документа", minWidth: 170 },
  { id: "documentName", label: "Название документа", minWidth: 100 },
  { id: "documentType", label: "Тип документа", minWidth: 170 },
  { id: "documentStatus", label: "Статус документа", minWidth: 170 },
  {
    id: "companySignatureName",
    label: "Подпись компании",
    minWidth: 170,
  },
  {
    id: "employeeSignatureName",
    label: "Подпись сотрудника",
    minWidth: 170,
  },
  {
    id: "companySigDate",
    label: "Дата подписи компании",
    minWidth: 170,
    format: (value: ISO) => {
      if (value) {
        return new Date(value).toLocaleDateString();
      } else {
        return "";
      }
    },
  },
  {
    id: "employeeSigDate",
    label: "Дата подписи сотрудника",
    minWidth: 170,
    format: (value: ISO) => {
      if (value) {
        return new Date(value).toLocaleDateString();
      } else {
        return "";
      }
    },
  },
  { id: "employeeNumber", label: "Номер сотрудника", minWidth: 170 },
];

const UserDocsContext = createContext({});
const UserDocsLogic = () => {
  const { token, status } = useAuthToken();
  const [data, setData] = useState<UserDocs[]>([]);
  const [error, setError] = useState<string>("");
  const fetchData = async () => {
    setError("");
    try {
      const response = await fetchUserDocs.getUsers();
      const data = response.data;
      if (data.error_code === 0) {
        setData(data.data);
      } else {
        setError(data.error_message);
      }
    } catch (error) {
      console.log(error);
      setError("Ошибка при получении данных");
    }
  };

  useEffect(() => {
    if (status === "authorized") fetchData();
  }, [status]);

  return (
    <UserDocsContext.Provider value={setData}>
      <BasicTable data={data} columns={columns} />
    </UserDocsContext.Provider>
  );
};

export default UserDocsLogic;

export { UserDocsContext };
