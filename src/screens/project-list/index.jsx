import { SearchPanel } from "./search-panel";
import { List } from "./list";

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  useEffect(async () => {
    const response = await fetch("");
    if (response.ok) {
      setList(await response.json());
    }
  }, [params]);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} />
      <List list={list} />
    </div>
  );
};
