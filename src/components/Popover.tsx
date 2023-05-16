import { RefObject, useEffect, useRef } from "react";
import { DismissButton, useOverlay, OverlayProps } from "@react-aria/overlays";
import { FocusScope } from "@react-aria/focus";

interface PopoverProps<T> {
    popoverRef?: RefObject<HTMLDivElement>;
    children?: T;
}

const Popover = <T extends object>(
    props: OverlayProps & PopoverProps<T>
): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const { popoverRef = ref, isOpen, onClose, children } = props;

    const { overlayProps } = useOverlay(
        {
            isOpen,
            onClose,
            shouldCloseOnBlur: true,
            isDismissable: true,
        },
        popoverRef
    );

    useEffect(() => {
        popoverRef.current?.animate(
            {
                opacity: [0, 1],
            },
            {
                duration: 200,
                easing: "ease",
                fill: "forwards",
            }
        );
    }, []);

    return (
        <FocusScope restoreFocus>
            <div
                {...overlayProps}
                ref={popoverRef}
                css={{
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "#D0B49F",
                    borderRadius: "4px",
                    marginTop: "4px",
                    filter: "drop-shadow(0px 0px 4px #ddd)",
                    opacity: 0,
                }}
            >
                {children}
                <DismissButton onDismiss={onClose} />
            </div>
        </FocusScope>
    );
};

export default Popover;
