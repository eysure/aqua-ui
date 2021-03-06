import React from "react";
import { connect } from "react-redux";
import * as UI from "@material-ui/core";

import { R } from "./index";

const itemImageStyle = {
    border: "1px solid lightgrey",
    borderRadius: "4px",
    width: "48px",
    height: "48px"
};

const tableCellStyle = {
    padding: "0 12px 0 12px"
};

class ItemTableRow extends React.Component {
    render() {
        const item = this.props.item;
        if (item === null) return null;

        return (
            <UI.TableRow
                key={item.item_no}
                hover={this.props.editMode}
                role={this.props.editMode ? "button" : ""}
                style={{ cursor: this.props.editMode ? "pointer" : "default" }}
            >
                {this.props.editMode ? (
                    <UI.TableCell className="order-detail-item-button-cell">
                        <UI.IconButton color="secondary" onClick={() => this.props.deleteItem(item.item_no)}>
                            <i className="material-icons">remove_circle</i>
                        </UI.IconButton>
                    </UI.TableCell>
                ) : null}
                <UI.TableCell style={tableCellStyle}>
                    <a target="_blank" rel="noopener noreferrer" href={"/assets/item/img/" + item.image}>
                        <img alt={item.item_no} src={"/assets/item/img/" + item.image} style={itemImageStyle} />
                    </a>
                </UI.TableCell>
                <UI.TableCell style={tableCellStyle}>
                    <p
                        style={{
                            fontWeight: 800,
                            fontSize: "1.2em",
                            marginBottom: "0"
                        }}
                    >
                        {item.item_no}
                    </p>
                    <p style={{ marginTop: "4px" }}>{item.po_no}</p>
                </UI.TableCell>
                <UI.TableCell style={tableCellStyle}>
                    <p
                        style={{
                            fontWeight: 800,
                            fontSize: "1.2em",
                            marginBottom: "0"
                        }}
                    >
                        {item.item_name}
                    </p>
                    <p style={{ marginTop: "4px" }}>{item.item_desc}</p>
                </UI.TableCell>
                <UI.TableCell align="left" style={tableCellStyle}>
                    <UI.TextField
                        name="qty"
                        margin="dense"
                        disabled={!this.props.editMode}
                        value={item.qty}
                        onChange={e => this.props.onChange(item.item_no, "qty", e.target.value, "integer")}
                        InputProps={{ className: "order-detail-item-input" }}
                    />
                </UI.TableCell>
                <UI.TableCell align="left" style={tableCellStyle}>
                    <UI.TextField
                        name="price"
                        margin="dense"
                        disabled={!this.props.editMode}
                        InputProps={{
                            className: "order-detail-item-input",
                            startAdornment: <UI.InputAdornment position="start">{R.get(item.currency)}</UI.InputAdornment>
                        }}
                        value={item.price}
                        onChange={e => this.props.onChange(item.item_no, "price", e.target.value, "float")}
                    />
                </UI.TableCell>
                <UI.TableCell align="left" style={tableCellStyle}>
                    {R.get(item.currency) + (item.qty * item.price).toFixed(2)}
                </UI.TableCell>
                <UI.TableCell align="left" style={tableCellStyle}>
                    <UI.TextField
                        name="delivery_date"
                        className="order-detail-item-input"
                        value={item.delivery_date}
                        type="date"
                        margin="normal"
                        disabled={!this.props.editMode}
                        onChange={e => this.props.onChange(item.item_no, "delivery_date", e.target.value, "date")}
                    />
                </UI.TableCell>
                <UI.TableCell align="left" style={tableCellStyle}>
                    <p
                        style={{
                            fontWeight: 800,
                            fontSize: "1.2em",
                            marginBottom: "0"
                        }}
                    >
                        {item.purchase_order}
                    </p>
                    <p style={{ marginTop: "4px" }}>{item.supplier}</p>
                </UI.TableCell>
            </UI.TableRow>
        );
    }
}

export default connect(
    state => {
        return { user: state.user };
    },
    null
)(ItemTableRow);
