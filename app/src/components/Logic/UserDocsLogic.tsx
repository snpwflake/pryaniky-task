import { createContext, useEffect, useMemo, useState } from "react";
import BasicTable from "../UI/Table";
import fetchUserDocs from "../../services/UserDocs";
import { ISO, UserDocs } from "../../models/userDocs";
import useAuthToken from "../../hooks/useAuth";
import { Column } from "../../models/table";
import ChangeButton from "../UI/ChangeButton";
import AddDocButton from "../UI/DialogAddDoc";
import LoadingContainer from "./LoadingContainer";

const columns: Column[] = [
  {
    id: "options",
    label: "Опции",
    minWidth: 170,
    format: (value: string, row: UserDocs) => {
      return <ChangeButton data={row} />;
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

const UserDocsLogic = () => {
  return (
    <DocsProvider>
      <AddDocButton />
      <BasicTable columns={columns} />
    </DocsProvider>
  );
};

export default UserDocsLogic;

function DocsProvider({ children }: any) {
  const { status } = useAuthToken();
  const [state, setState] = useState<UserDocs[]>([]);
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const provided = useMemo(
    () => ({ value: state, setValue: setState, error, loading }),
    [state, error, loading]
  );

  const fetchData = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetchUserDocs.getUsers();
      const data = response.data;
      if (data.error_code === 0) {
        setState(data.data);
      } else {
        setError(data.error_message);
      }
    } catch (error) {
      console.log(error);
      setError("Ошибка при получении данных");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (status === "authorized") fetchData();
  }, [status]);

  return (
    <UserDocsContext.Provider value={provided}>
      {children}
    </UserDocsContext.Provider>
  );
}

export const UserDocsContext = createContext<{
  value: UserDocs[];
  setValue: React.Dispatch<React.SetStateAction<UserDocs[]>>;
  error: string;
  loading: boolean;
}>({ value: [], setValue: () => {}, error: "", loading: false });
