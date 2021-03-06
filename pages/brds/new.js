import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class BrdNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createBrd(this.state.minimumContribution).send({
        from: accounts[0]
      });

      //creates history page
      Router.pushRoute(`/`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create Room</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label />
            <Input
              label='wei'
              labelPosition='left'
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message
            error
            header='Something went wrong:'
            content={this.state.errorMessage}
          />
          <Button loading={this.state.loading} color='green'>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default BrdNew;
