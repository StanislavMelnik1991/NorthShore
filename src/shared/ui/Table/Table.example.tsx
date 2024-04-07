import { ConfigItemType, Table } from "./Table";

export const TableExample = () => {
  const config: Array<ConfigItemType> = [
    { name: "id", label: <p>№</p>, width: 50 },
    { name: "status", label: <p>status</p> },
    { name: "text", label: <p>text</p> },
  ];
  type Item = {
    id: JSX.Element;
    status: JSX.Element;
    text: JSX.Element;
  };
  const items: Array<Item> = [
    {
      id: <p>1</p>,
      status: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      ),
      text: <p>asasasdas</p>,
    },
    {
      id: <p>2</p>,
      status: <p>asdasdasdasd</p>,
      text: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      ),
    },
    { id: <p>3</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>4</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>5</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>6</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>7</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>8</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>9</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>0</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
    { id: <p>11</p>, status: <p>asdasdasdasd</p>, text: <p>asasasdas</p> },
  ];
  return <Table items={items} config={config} />;
};
