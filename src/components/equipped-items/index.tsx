import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";
import { StatsState } from "../../store/stats/types";

import { ItemType } from "../../types";

import EmptySlot, { DarkenSlot } from "../empty-slot";
import { unequipItem } from "../../store/stats/actions";

import BootsOutline from "./assets/boots-outline.png";
import HelmetOutline from "./assets/helmet-outline.png";
import BodyOutline from "./assets/body-outline.png";
import GlovesOutline from "./assets/gloves-outline.png";
import PantsOutline from "./assets/pants-outline.png";
import RingOutline from "./assets/ring-outline.png";
import SwordOutline from "./assets/sword-outline.png";
import Character from "./assets/equipment-character.png";

import "./styles.scss";

interface DispatchProps {
    unequipItem: (item: ItemType) => void;
}

interface StateProps {
    stats: StatsState;
}

type EquippedItemsProps = DispatchProps & StateProps;

const EquippedItems: FunctionComponent<EquippedItemsProps> = (props: EquippedItemsProps) => {
    const { weapon, ring, helmet, boots, body, gloves, legs } = props.stats.equippedItems;

    return (
        <div className="equipped-items-character" style={{ backgroundImage: `url(${Character})` }}>
            <EmptySlot className="white-border equipped-items-helmet">
                {helmet ? (
                    <button
                        className="equipped-items-slot"
                        onClick={(): void => props.unequipItem(helmet)}
                        style={{
                            backgroundImage: `url('${helmet.image}')`,
                        }}
                    >
                        <DarkenSlot />
                    </button>
                ) : (
                    <div className="equipped-items-slot" style={{ backgroundImage: `url('${HelmetOutline}')` }} />
                )}
            </EmptySlot>

            <EmptySlot className="white-border equipped-items-body">
                {body ? (
                    <button
                        className="equipped-items-slot"
                        onClick={(): void => props.unequipItem(body)}
                        style={{
                            backgroundImage: `url('${body.image}')`,
                        }}
                    >
                        <DarkenSlot />
                    </button>
                ) : (
                    <div className="equipped-items-slot" style={{ backgroundImage: `url('${BodyOutline}')` }} />
                )}
            </EmptySlot>

            <div className="flex-row flex-end">
                <EmptySlot className="equipped-items-gloves-left">
                    {gloves && (
                        <div
                            style={{
                                height: 40,
                                width: 40,
                                backgroundImage: `url('${gloves.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </div>
                    )}
                </EmptySlot>
                <EmptySlot className="white-border equipped-items-pants">
                    {legs ? (
                        <button
                            className="equipped-items-slot"
                            onClick={(): void => props.unequipItem(legs)}
                            style={{
                                backgroundImage: `url('${legs.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items-slot"
                            style={{
                                backgroundImage: `url('${PantsOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
                <EmptySlot className="white-border equipped-items-gloves-right">
                    {gloves ? (
                        <button
                            className="equipped-items-slot"
                            onClick={(): void => props.unequipItem(gloves)}
                            style={{
                                backgroundImage: `url('${gloves.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items-slot"
                            style={{
                                backgroundImage: `url('${GlovesOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
            </div>

            <div className="flex-row space-between">
                <EmptySlot className="white-border equipped-items-ring">
                    {ring ? (
                        <button
                            className="equipped-items-slot"
                            onClick={(): void => props.unequipItem(ring)}
                            style={{ backgroundImage: `url('${ring.image}')` }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div className="equipped-items-slot" style={{ backgroundImage: `url('${RingOutline}')` }} />
                    )}
                </EmptySlot>

                <EmptySlot className="white-border equipped-items-weapon">
                    {weapon ? (
                        <button
                            className="equipped-items-slot"
                            onClick={(): void => props.unequipItem(weapon)}
                            style={{
                                backgroundImage: `url('${weapon.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items-slot"
                            style={{
                                backgroundImage: `url('${SwordOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
            </div>

            <div className="flex-row space-between">
                <EmptySlot className="equipped-items-boots-left">
                    {boots && (
                        <div
                            style={{
                                height: 40,
                                width: 40,
                                backgroundImage: `url('${boots.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </div>
                    )}
                </EmptySlot>
                <EmptySlot className="white-border equipped-items-boots-right">
                    {boots ? (
                        <button
                            className="equipped-items-slot"
                            onClick={(): void => props.unequipItem(boots)}
                            style={{
                                backgroundImage: `url('${boots.image}')`,
                            }}
                        >
                            <DarkenSlot />
                        </button>
                    ) : (
                        <div
                            className="equipped-items-slot"
                            style={{
                                backgroundImage: `url('${BootsOutline}')`,
                            }}
                        />
                    )}
                </EmptySlot>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({ stats: state.stats });
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    unequipItem: (item: ItemType): void => dispatch(unequipItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EquippedItems);
