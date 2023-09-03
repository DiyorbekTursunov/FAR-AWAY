import { FormEvent, useEffect, useState } from "react";
export default function Todo() {
  const [option, setoption] = useState<string>("1");
  const [packedValue, setpackedValue] = useState<number>(0);
  const [text, settext] = useState<string>("");
  const [chaked2, setchaked2] = useState<boolean>(false);
  const [selection, setselection] = useState<string>("");
  const [Data, setData] = useState<any>([]);
  const [DefaultData, setDefaultData] = useState<any>(Data);

  const action = {
    id: Date.now(),
    option: option,
    item: text,
    checked: false,
  };

  const Onchange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData([action, ...Data]);
    setDefaultData([action, ...Data]);
    settext("");
  };

  function DelHendel(id: any) {
    setData(
      Data.filter((item: any) => {
        setpackedValue(item.checked && packedValue - 1);
        return item.id != id;
      })
    );
  }

  const isChecked = (item: any) => {
    setpackedValue(item.checked ? packedValue - 1 : packedValue + 1);
    setchaked2(chaked2 ? false : true);
    item.checked ? (item.checked = false) : (item.checked = true);
  };

  useEffect(() => {
    const Truevalue = Data.filter((item: any) => item.checked == true);
    const Falsevalue = Data.filter((item: any) => item.checked != true);
    if (selection === "packed") {
      setData([...Truevalue, ...Falsevalue]);
    } else if (selection === "unpacked") {
      setData([...Falsevalue, ...Truevalue]);
    } else if (selection === "default") {
      setData(DefaultData);
    }
  }, [selection]);

  return (
    <div>
      <h1>
        <h1>🏝 Far Away 🧳</h1>
      </h1>

      <form className="add-form" onSubmit={Onchange}>
        <h3>What do you need for your?</h3>
        <select onChange={(e) => setoption(e.target.value)}>
          {Array.from({ length: 20 }, (_, index) => index + 1).map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <select onChange={(e) => setselection(e.target.value)}>
          <option value="default">default</option>
          <option value="packed">packed</option>
          <option value="unpacked">unpacked</option>
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={text}
          onChange={(e) => settext(e.target.value.trim())}
        />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        <ul>
          {Data.length > 0 ? Data.map((item: any) => {
            return (
              <li>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => isChecked(item)}
                    checked={item.checked}
                  />
                  <p>{item.option}</p>
                  <span className={`${item.checked && "text-red-500"}`}>
                    {item.item}
                  </span>
                  <button onClick={() => DelHendel(item.id)}>❌</button>
                </label>
              </li>
            );
          }) : <h1 className="">No items</h1>}
        </ul>
      </div>
      <div className="fixed w-full bottom-0">
        <footer className="stats">
          <em className="">{`You have  items ${
            Data.length
          } list , and you already packed ${
            packedValue ? packedValue : 0
          }`}</em>
        </footer>
      </div>
    </div>
  );
}
