import { useRef } from "react";

import { AriaSelectOptions, HiddenSelect, useSelect } from "@react-aria/select";
import { useButton } from "@react-aria/button";
import { ListProps } from "@react-stately/list";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { useSelectState } from "@react-stately/select";

import ListBox from "./ListBox";
import Popover from "./Popover";

interface ListBoxProps<T> extends ListProps<T>, AriaListBoxOptions<T> {}

const SelectBox = <T extends object>(
    props: AriaSelectOptions<T>
): JSX.Element => {
    const state = useSelectState<T>(props);
    const ref = useRef<HTMLButtonElement>(null);
    const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
        props,
        state,
        ref
    );

    const { buttonProps } = useButton(triggerProps, ref);

    return (
        <div
            css={{
                position: "relative",
                display: "inline-block",
            }}
        >
            <div {...labelProps}>{props.label}</div>
            <HiddenSelect
                state={state}
                triggerRef={ref}
                label={props.label}
                name={props.name}
            />
            <button
                {...buttonProps}
                ref={ref}
                style={{
                    width: "15rem",
                    height: "2rem",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            >
                <div
                    css={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div css={{}}>
                        <span {...valueProps}>
                            {state.selectedItem
                                ? state.selectedItem.rendered
                                : "選択してください"}
                        </span>
                    </div>
                    <div>{state.isOpen ? "↑" : "↓"}</div>
                </div>
            </button>
            {state.isOpen && (
                <Popover isOpen={state.isOpen} onClose={state.close}>
                    <ListBox<T>
                        {...(menuProps as ListBoxProps<T>)}
                        state={state}
                    />
                </Popover>
            )}
        </div>
    );
};

export default SelectBox;
