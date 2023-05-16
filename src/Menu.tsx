import { Key, useState } from "react";
import { Item } from "react-stately";
import SelectBox from "./components/SelectBox";

interface DataType {
    key: string;
    content: string;
}

const Menu = (): JSX.Element => {
    const dataList: DataType[] = [
        {
            key: "hoge",
            content: "ほげ",
        },
        {
            key: "hige",
            content: "ひげひげひげ",
        },
        {
            key: "fuga",
            content: "ふがふが",
        },
    ];
    const [selected, setSelected] = useState("");
    const handleChangeSelected = (key: Key): void => {
        setSelected(key.toString());
    };
    return (
        <>
            <SelectBox
                label="ラベル"
                selectedKey={selected}
                onSelectionChange={handleChangeSelected}
            >
                {dataList.map((data) => (
                    <Item key={data.key}>{data.content}</Item>
                ))}
            </SelectBox>
        </>
    );
};

export default Menu;
