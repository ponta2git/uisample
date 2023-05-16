import { ReactNode, useRef } from "react";
import { useButton } from "@react-aria/button";

interface Props {
    children?: ReactNode;
}

const Button = (props: Props): JSX.Element => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const { children } = props;

    return (
        <button
            {...buttonProps}
            ref={ref}
            css={{
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#A47551",
                color: "#eee",
                ":active": {
                    backgroundColor: "#523A28",
                },
            }}
        >
            {children}
        </button>
    );
};

export default Button;
