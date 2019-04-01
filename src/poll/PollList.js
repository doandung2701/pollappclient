import React, { Component } from 'react';
import {Redirect } from 'react-router-dom'
import Poll from './Poll';
import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { POLL_LIST_SIZE } from '../constants';
import './PollList.css';
import PollContainer from './PollContainer';
class PollList extends Component {
    constructor(props) {
        super(props);        
        this.loadPollList = this.loadPollList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);      
        this.isChange=this.props.isAuthenticated;
    }

    loadPollList(page = 0, size = POLL_LIST_SIZE) {
        if(this.props.username) {
            let data={
                username:this.props.username,
                page:page,
                size:size
            }
            if(this.props.type === 'USER_CREATED_POLLS') {
                this.props.loadingUserCreatedPolls(data);
            } else if (this.props.type === 'USER_VOTED_POLLS') {
                this.props.loadingUserVotedPolls(data);                               
            }
        } else {
            this.props.loadingAllPolls({page, size});
        } 
        
    }

    componentDidMount() {
        this.loadPollList();
    }
    
    
    handleLoadMore() {
        this.loadPollList(this.props.polls.page + 1);
    }

    handleVoteChange(event, pollIndex) {
        const currentVotes = this.props.polls.currentVotes.slice();
        currentVotes[pollIndex] = event.target.value;
        this.props.VoteChange(currentVotes);
    }
    handleVoteSubmit(event, pollIndex) {
        event.preventDefault();
        if(!this.props.isAuthenticated) {
            this.props.history.push("/login");
            notification.info({
                message: 'Polling App',
                description: "Please login to vote.",          
            });
            return;
        }

        const poll = this.props.polls.polls[pollIndex];
        const selectedChoice = this.props.polls.currentVotes[pollIndex];

        const voteData = {
            pollId: poll.id,
            choiceId: selectedChoice
        };

        this.props.castVote(voteData,pollIndex);
        
    }

    render() {
        if(this.props.polls.isLogout==true){
            return <Redirect
            to={{
            pathname: "/",
            state: { from: this.props.location }
        }}/>;
        }
        const pollViews = [];
        this.props.polls.polls.forEach((poll, pollIndex) => {
            pollViews.push(<PollContainer
                key={poll.id} 
                poll={poll}
                currentVote={this.props.polls.currentVotes[pollIndex]} 
                handleVoteChange={(event) => this.handleVoteChange(event, pollIndex)}
                handleVoteSubmit={(event) => this.handleVoteSubmit(event, pollIndex)} />)            
        });

        return (
            <div className="polls-container">
                {pollViews}
                {
                    !this.props.polls.isLoading && this.props.polls.polls.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No Polls Found.</span>
                        </div>    
                    ): null
                }  
                {
                    !this.props.polls.isLoading && !this.props.polls.last ? (
                        <div className="load-more-polls"> 
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }              
                {
                    this.props.polls.isLoading ? 
                    <LoadingIndicator />: null                     
                }
            </div>
        );
    }
}

export default PollList;