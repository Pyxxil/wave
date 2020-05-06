import React, { Component } from "react";
import ReactTimeout from "react-timeout";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SnackbarState } from "../../store/snackbar/types";
import { RootState } from "../../store";
import { InventoryState } from "../../store/inventory/types";
import { equipItem } from "../../store/stats/actions";
import { clearNotification } from "../../store/snackbar/actions";

import { ItemType } from "../../types";

import Dialog from "../../components/dialog";

import { SNACK_DURATION, E_KEY } from "../../constants";

import "./styles.scss";

interface DispatchProps {
    equipItem: (item: ItemType) => void;
    clearNotification: () => void;
}

interface StateProps {
    snackbar: SnackbarState;
    inventory: InventoryState;
}

interface OwnProps {
    sideMenu: boolean;
    largeView: boolean;
}

type SnackbarProps = DispatchProps & StateProps & OwnProps & ReactTimeout.ReactTimeoutProps;
type State = { show: string; item?: ItemType; equip: boolean };

class Snackbar extends Component<SnackbarProps> {
    state: State = {
        show: "",
        equip: false,
    };

    componentDidUpdate(prevProps: SnackbarProps): void {
        const {
            itemReceived,
            itemUsed,
            itemDropped,
            notEnoughGold,
            tooManyItems,
            item,
            message,
            itemSold,
        } = this.props.snackbar;

        const lastItemReceived = prevProps.snackbar.itemReceived;
        const lastItemDropped = prevProps.snackbar.itemDropped;
        const lastItemUsed = prevProps.snackbar.itemUsed;
        const lastNotEnoughGold = prevProps.snackbar.notEnoughGold;
        const lastTooManyItems = prevProps.snackbar.tooManyItems;
        const lastMessage = prevProps.snackbar.message;
        const lastItemSold = prevProps.snackbar.itemSold;

        if (lastMessage !== message && message) {
            this.setState({
                show: message.split("-")[0],
                item: null,
                equip: false,
            });
            this.props.setTimeout && this.props.setTimeout(() => this.handleHideSnack(), SNACK_DURATION);
        } else if (lastItemUsed !== itemUsed && itemUsed && typeof itemUsed !== "undefined") {
            // see if any items were used
            this.setState({
                show: `USED ITEM: ${itemUsed.split("-")[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout && this.props.setTimeout(() => this.handleHideSnack(), SNACK_DURATION);
        } else if (lastItemDropped !== itemDropped && itemDropped) {
            // see if any items were dropped
            this.setState({
                show: `LOST ITEM: ${itemDropped.split("-")[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout && this.props.setTimeout(() => this.handleHideSnack(), SNACK_DURATION);
        } else if (lastItemReceived !== itemReceived && itemReceived) {
            // see if any items were received
            this.setState({
                show: `NEW ITEM: ${itemReceived.split("-")[0]}`,
                item: item,
                equip: item?.type !== "potion",
            });
            this.props.setTimeout && this.props.setTimeout(() => this.handleHideSnack(), SNACK_DURATION);
        } else if (lastNotEnoughGold !== notEnoughGold && notEnoughGold) {
            // see if player tried to buy item without enough gold
            this.setState({
                show: `NOT ENOUGH GOLD`,
                item: item,
                equip: false,
            });
            this.props.setTimeout && this.props.setTimeout(() => this.handleHideSnack(), SNACK_DURATION);
        } else if (lastTooManyItems !== tooManyItems && tooManyItems) {
            // see if player tried to get item with full inventory
            this.setState({
                show: `NO ROOM FOR: ${tooManyItems.split("-")[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout && this.props.setTimeout(() => this.handleHideSnack(), SNACK_DURATION);
        } else if (lastItemSold !== itemSold && itemSold) {
            this.setState({
                show: `SOLD ITEM: ${itemSold.split("-")[0]}`,
                item: item,
                equip: false,
            });
            this.props.setTimeout && this.props.setTimeout(() => this.handleHideSnack(), SNACK_DURATION);
        }
    }

    handleHideSnack(): void {
        this.setState({ show: "" });
        this.props.clearNotification();
    }

    handleEquip(): void {
        this.props.equipItem(this.props.inventory.items[this.props.inventory.items.length - 1]);
        this.handleHideSnack();
    }

    render(): React.ReactElement | null {
        const { sideMenu, largeView } = this.props;
        const { show, equip } = this.state;

        let width;
        if (sideMenu) width = 400;
        else if (largeView) width = 398;
        else width = 350;

        if (show.length === 0) return null;

        return (
            <Dialog
                className="snackbar-container white-border"
                keys={[E_KEY]}
                onKeyPress={(): void => {
                    if (this.state.equip) this.handleEquip();
                }}
                style={{
                    marginLeft: sideMenu ? -402 : 0,
                    top: sideMenu ? 360 : -50,
                    width,
                    height: sideMenu ? 40 : 40,
                    fontSize: sideMenu ? 18 : 20,
                    opacity: show === "" ? 0 : 1,
                    zIndex: show === "" ? 0 : 1003,
                    transition:
                        show === ""
                            ? "opacity .35s ease-in-out, z-index .35s step-end"
                            : "opacity .35s ease-in-out, z-index .35s step-start",
                }}
            >
                {equip ? (
                    <div>
                        <span className="snackbar-equip-text">
                            {show}
                            <button
                                className="snackbar-equip-button white-border"
                                onClick={(): void => this.handleEquip()}
                            >
                                <FontAwesomeIcon icon="hand-paper" className="button-icon" />
                            </button>
                        </span>
                    </div>
                ) : (
                    <span className="snackbar-text">{show}</span>
                )}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: RootState): StateProps => ({ snackbar: state.snackbar, inventory: state.inventory });

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    equipItem: (item: ItemType): void => dispatch(equipItem(item)),
    clearNotification: (): void => dispatch(clearNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactTimeout(Snackbar));
