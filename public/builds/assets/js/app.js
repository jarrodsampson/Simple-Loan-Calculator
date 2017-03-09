$(document).ready(function(){
    $("a[href='#top']").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.topHome').fadeIn();
        } else {
            $('.topHome').fadeOut();
        }
    });
});

// get transitions initialized
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var LoanBox = React.createClass({
    getInitialState: function() {

        return {
            data: [],
            childAddVisible: true
        };
    },
    componentDidMount: function() {
    },
    removeItem: function (i) {
        // removal of item from main component

        console.log(this.state.data[i]);


        this.setState({
            data : React.addons.update( this.state.data , { $splice : [[i,1]] }  )
        });

        alertify.log( 'Loan Quote Removed.', 'info' );


    },
    addLoanQuote: function(e) {
        e.preventDefault();

        // adding loan quote

        if (   typeof this.state.amount == "undefined"
            || this.state.amount == 0
            || isNaN(this.state.amount)
            || typeof this.state.interestRate == "undefined"
            || isNaN(this.state.interestRate)
            || typeof this.state.years == "undefined"
            || isNaN(this.state.years)
            || this.state.years == 0) {

            alertify.log( 'Please Add Valid Loan Information.', 'error' );

        } else {

            if (this.state.data.length >= 20) {
                // TODO and can remove old quotes after 20 rows have been created
            }

            var loanObj = {
                id: this.state.data.length + 1546,
                amount:parseFloat(this.state.amount),
                interest:parseFloat(this.state.interestRate),
                years:parseFloat(this.state.years)
            };

            console.log(loanObj);

            this.setState({
                data : this.state.data.concat([loanObj])
            });

            alertify.log( 'Loan Quote Added', 'info' );

            console.log("Added New Loan Quote", this.state.data);

        }


    },
    clearAllLoans: function () {

        this.setState({
            data: []
        });

        this.state.amount = "";
        this.state.interestRate = "";
        this.state.years = "";

        alertify.log( 'All Previous Quotes Removed.', 'info' );

    },
    toggleQuotes: function() {
        this.setState({childAddVisible: !this.state.childAddVisible});
    },
    onAmountChange: function(e) {
        this.setState({amount: e.target.value});
    },
    onInterestRateChange: function(e) {
        this.setState({interestRate: e.target.value});
    },
    onYearChange: function(e) {
        this.setState({years: e.target.value});
    },
    render: function() {
        return (
        <div className="loanBox">
            <div className="row">
                <ReactCSSTransitionGroup
                    transitionName="example2"
                    transitionAppear={true}
                    transitionEnterTimeout={5100}
                    transitionAppearTimeout={5100}
                    transitionLeaveTimeout={5100}>
                    <div className="col-md-12 spacer-small">
                        <h1>Loan Calculator <small>Helping you better understand your credit.</small></h1>
                        <em>Loan Payments and Calculations are based on estimated payments close to what can be expected.</em>
                    </div>
                </ReactCSSTransitionGroup>
                <div className="col-md-12">
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionEnterTimeout={5100}
                        transitionAppearTimeout={5100}
                        transitionLeaveTimeout={5100}>
                        <div className="col-md-12 no-padding">

                            <div className="col-md-12 no-padding">
                                <div className="col-md-4 text-center">
                                    <span className="detailStat">Amount</span>
                                    <p>
                                        <span className="numberStat">
                                            { this.state.amount == 0 || isNaN(this.state.amount) ? '$0.00' :  '$' + parseFloat(this.state.amount).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <div className="col-md-4 text-center">
                                    <span className="detailStat">Interest Rate</span>
                                    <p>
                                        <span className="numberStat">
                                            { this.state.interestRate == 0 || isNaN(this.state.interestRate) ? '0.00%': parseFloat(this.state.interestRate).toFixed(2) + '%' }
                                        </span>
                                    </p>
                                </div>
                                <div className="col-md-4 text-center">
                                    <span className="detailStat">Years</span>
                                    <p>
                                        <span className="numberStat">
                                            { isNaN(this.state.years) && '0'}
                                            { !isNaN(this.state.years) && this.state.years }
                                            { this.state.years == 0 ? '0': null }
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ReactCSSTransitionGroup>
                </div>

                <form onSubmit={this.addLoanQuote}>
                    <div className="col-md-12 spacer-small">
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onAmountChange} value={this.state.amount} placeholder="Amount" maxLength="7" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onInterestRateChange} value={this.state.interestRate} placeholder="Interest Rate" maxLength="5" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.onYearChange} value={this.state.years} placeholder="Number of Years" maxLength="3" />
                            </div>
                        </div>
                        <button className="btn btn-primary margin-left">Get Quote</button>
                    </div>

                </form>

                <div className="col-md-12 margin-left spacer-smaller">

                    <div className="col-md-2 no-padding">
                        <p className="push-down-half">
                            {this.state.data.length == 1 ? (this.state.data.length) + ' Quote Added.' : '' }
                            {this.state.data.length > 1 ? (this.state.data.length) + ' Previous Quotes Added.' : '' }
                            {this.state.data.length <= 0 ? 'No Previous Quotes.' : '' }
                        </p>
                    </div>

                    <div className="col-md-10 no-padding">
                        <button className="btn btn-primary" onClick={ this.toggleQuotes }>Hide/Show Previous Quotes</button>&nbsp;
                        <button className="btn btn-danger" onClick={ this.clearAllLoans } disabled={this.state.data.length <= 0}>Erase All</button>
                    </div>

                </div>

                <div className="col-md-12 margin-left">

                    { this.state.childAddVisible ?

                        <ReactCSSTransitionGroup
                            transitionName="example2"
                            transitionAppear={true}
                            transitionEnterTimeout={5100}
                            transitionAppearTimeout={5100}
                            transitionLeaveTimeout={5100}>

                                <LoanList
                                    data={this.state.data}
                                    onRemoveItem={this.removeItem}
                                />


                        </ReactCSSTransitionGroup>

                    : null }

                </div>

            </div>
        </div>

                );
    }

});

var LoanList = React.createClass({
    removeItem: function(i) {
        this.props.onRemoveItem(i);
    },
    render: function() {
        var rows = [];
        this.props.data.reverse().map(function(loan, i) {

            // gather data from the JSON file here after filtering
            rows.push(<Loan
            id={loan.id}
            key={loan.id}
            amount={loan.amount}
            interestRate={loan.interest}
            years={loan.years}
            monthlyPayment={loan.monthly}
            onClick={this.removeItem.bind(this, i)} />);

        }.bind(this));
        //console.log(rows);
        // show UI feedback if there are no rows in the result set
        if (rows.length >= 1) {
            return (
                <table className="table table-striped table-hover">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Quote #</th>
                            <th>Amount</th>
                            <th>Interest Rate</th>
                            <th>Number of Years</th>
                            <th>Monthly Payment</th>
                            <th>Monthly Interest</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        );
        } else {
            return (

                <table className="table table-striped text-centered">
                    <thead>
                        <tr>
                            <th>Quote #</th>
                            <th>Amount</th>
                            <th>Interest Rate</th>
                            <th>Number of Years</th>
                            <th>Monthly Payment</th>
                            <th>Monthly Interest</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="7">
                                <p>
                                    <em>No Previous Quotes Found.</em>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
        );
        }

    }
});

var Loan = React.createClass({

    viewDetails: function (data) {

        // view details of object
        var info = data.amount + "\n" +
            data.interest + "\n" +
            data.yearly;

        var infoHTML = data.name + "<br />" +
            "$" + data.limit + "</br />" +
            "$" + data.balance;
        //alert(info);
        console.log(info);

        alertify.log( infoHTML, 'info' );

    },

    render: function() {
        // the component to display the data here
        return (
            <tr className="loan">
                <td className="table-text">
                    <span>{this.props.id}</span>
                </td>
                <td className="table-text">
                    <span>${ parseFloat(this.props.amount).toFixed(2) }</span>
                </td>
                <td className="table-text">
                    <span>{parseFloat(this.props.interestRate).toFixed(2)}%</span>
                </td>
                <td className="table-text">
                    <span>{this.props.years}</span>
                </td>
                <td className="table-text">
                    <span>${ parseFloat( (this.props.amount / (this.props.years * 12)) + ((this.props.amount / (this.props.years * 12)) * (this.props.interestRate / 100)) ).toFixed(2) }</span>
                </td>
                <td className="table-text">
                    <span>${ parseFloat( (this.props.amount / (this.props.years * 12)) * (this.props.interestRate / 100) ).toFixed(2) }</span>
                </td>
                <td>
                    <button className="btn btn-primary" onClick={ this.props.onClick }>
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>
        );
    }
});

ReactDOM.render(
<LoanBox />,
    document.getElementById('loanContentApp')
);