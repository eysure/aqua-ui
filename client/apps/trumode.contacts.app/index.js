import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UI from "@material-ui/core";
import clientConfig from "../../client_config.js";
import PI from "../../components/panel_item";
import _ from "lodash";
import Avatar from "../../components/user_avatar";

import Window from "../../components/Window";

import { ResourceFeeder } from "../../resources_feeder";

import { computeJobInfo } from "../../utils";

import { R } from "../../resources_feeder";
import { getAppName } from "../../app_utils.js";

class Contacts extends Component {
    renderList = () => {
        let employees = this.props.db.employees;
        return _.map(employees, employee => {
            // Compute employee's department
            let jobInfo = computeJobInfo(employee._id, this.props.db);
            if (!jobInfo || jobInfo.length === 0) return null;
            jobInfo = jobInfo[0];
            let { deptName, groupName, jobTitle, jobType } = jobInfo;

            return (
                <React.Fragment key={employee._id}>
                    <PI
                        title={
                            <React.Fragment>
                                <Avatar user={employee} d={32} style={{ marginRight: "8px" }} /> {" " + (employee.name_cn || employee.fn_en)}
                            </React.Fragment>
                        }
                        value={employee.nickname}
                        span={3}
                    />
                    <PI title={jobTitle} span={3} />
                    <PI
                        title={employee.email}
                        span={3}
                        onClick={() => {
                            window.location = `mailto:${employee.email}`;
                        }}
                    />
                    <PI
                        className="monospace"
                        title={employee.mobile}
                        span={2}
                        onClick={() => {
                            window.location = `tel:${employee.mobile}`;
                        }}
                    />
                    <PI className="monospace" title={employee.ext} span={1} />
                </React.Fragment>
            );
        });
    };

    render() {
        return (
            <Window
                key="Main"
                _key="Main"
                width={900}
                height={600}
                appKey={this.props.appKey}
                titlebar={getAppName("trumode.contacts", this.props.user)}
                toolbar={this.toolbar}
            >
                <div className="window-content-inner" style={{ maxWidth: 1600 }}>
                    <div className="panel" style={{ gridColumnGap: 0 }}>
                        <PI title={R.Str("NAME")} value={R.Str("NICKNAME")} span={3} />
                        <PI title={R.Str("JOB_TITLE")} span={3} />
                        <PI title={R.Str("EMAIL")} span={3} />
                        <PI title={R.Str("MOBILE")} span={2} />
                        <PI title={R.Str("EXT")} span={1} />
                        {this.renderList()}
                    </div>
                </div>
            </Window>
        );
    }

    toolbar = (
        <div className="toolbar-icon">
            <button className="unhandle" disabled>
                <i className="material-icons">print</i>
            </button>
            <button className="unhandle" disabled>
                <i className="material-icons">save_alt</i>
            </button>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    return {
        db: state.db
    };
}

Contacts.manifest = {
    appKey: "trumode.contacts",
    appName: ["Contacts", "联系人"],
    icon: "/assets/apps/contacts.svg"
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);
