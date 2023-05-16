import { RefObject, useRef } from "react";
import { Node } from "@react-types/shared";
import { ListState, useListState, ListProps } from "@react-stately/list";
import { SelectState } from "@react-stately/select";
import { AriaListBoxOptions, useListBox, useOption } from "@react-aria/listbox";

interface MyListBoxProps<T> {
    listboxRef?: RefObject<HTMLUListElement>;
    state?: ListState<T> | SelectState<T>;
}

interface ListOptionProps<T> {
    item: Node<T>;
    state: ListState<T> | SelectState<T>;
}

const ListBox = <T extends object>(
    props: AriaListBoxOptions<T> & ListProps<T> & MyListBoxProps<T>
): JSX.Element => {
    const ref = useRef<HTMLUListElement>(null);

    const { listboxRef = ref, state = useListState<T>(props) } = props;
    const { listBoxProps, labelProps } = useListBox(props, state, ref);

    return (
        <>
            <div {...labelProps}>{props.label}</div>
            <ul
                {...listBoxProps}
                ref={listboxRef}
                css={{
                    listStyle: "none",
                    border: "1px solid gray",
                    borderRadius: "4px",
                    maxWidth: 250,
                }}
            >
                {[...state.collection].map((item) => (
                    <Option key={item.key} item={item} state={state} />
                ))}
            </ul>
        </>
    );
};

const Option = <T extends object>(props: ListOptionProps<T>): JSX.Element => {
    const ref = useRef<HTMLLIElement>(null);
    const { optionProps, isSelected } = useOption(
        { key: props.item.key },
        props.state,
        ref
    );

    return (
        <li
            {...optionProps}
            ref={ref}
            css={{
                backgroundColor: isSelected ? "#A47551" : "white",
                color: isSelected ? "#eee" : "#222",
                padding: "0.5rem",
                ":hover": {
                    backgroundColor: "#D0B49F",
                    color: "#eee",
                },
            }}
        >
            {props.item.rendered}
        </li>
    );
};

export default ListBox;
