import React, { Component } from 'react';
import PollList from '../../poll/PollList';
import { getUserProfile } from '../../util/APIUtils';
import { Avatar, Tabs } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import PollListContainer from '../../poll/PollListContainer';

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);        
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(username) {
       this.props.loadUserProfile(username);
    }
      
    componentDidMount() {
        const username = this.props.match.params.username;        
        this.loadUserProfile(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {        
        if(this.props.profile.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.props.profile.notFound) {
            return <NotFound />;
        }

        if(this.props.profile.serverError) {
            return <ServerError />;
        }

        const tabBarStyle = {
            textAlign: 'center'
        };

        return (
            <div className="profile">
                { 
                    this.props.profile.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(this.props.profile.user.name)}}>
                                        {this.props.profile.user.name[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.props.profile.user.name}</div>
                                    <div className="username">@{this.props.profile.user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDate(this.props.profile.user.joinedAt)}
                                    </div>
                                </div>
                            </div>
                            <div className="user-poll-details">    
                                <Tabs defaultActiveKey="1" 
                                    animated={false}
                                    tabBarStyle={tabBarStyle}
                                    size="large"
                                    className="profile-tabs">
                                    <TabPane tab={`${this.props.profile.user.pollCount} Polls`} key="1">
                                        <PollListContainer username={this.props.match.params.username} type="USER_CREATED_POLLS" />
                                    </TabPane>
                                    <TabPane tab={`${this.props.profile.user.voteCount} Votes`}  key="2">
                                        <PollListContainer username={this.props.match.params.username} type="USER_VOTED_POLLS" />
                                    </TabPane>
                                </Tabs>
                            </div>  
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default Profile;