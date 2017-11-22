import React, { Component } from "react";
import axios from 'axios';
import CirclePercentage from './CirclePercentage';

class BrandStatistics extends React.Component {

    constructor(){
        super();
        this.state = {
            brandNames:{
                brand1: "Cheerios",
                brand2: "Kashi",
                brand3: "Kellogg's",
                brand4: "Post",
            },
            brandStats:[]
        };
    }

    componentWillMount(){
          this.buildBrandsStatList();
    }


    buildBrandsStatList(){
        axios.post('/percentage-of-brands', this.state.brandNames)
            .then(response => {

                var brandStatisticsArray=[];
                let brandNames=this.state.brandNames;
                for (var brandName in brandNames) {
                    console.log(brandName, brandNames[brandName]);

                    var brandResult = response.data.find(function(brand){
                        return brand._id.brandName === brandNames[brandName];
                    });

                    if(brandResult){
                        brandStatisticsArray.push({brandname:brandNames[brandName], brandpercent:brandResult.percentage});
                    }
                    else{
                        brandStatisticsArray.push({brandname:brandNames[brandName], brandpercent:0.00});
                    }
                }
                 this.setState({brandNames:this.state.brandNames, brandStats:brandStatisticsArray});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        var brands = this.state.brandStats;

        var brandsList= brands.map((brand)=>{
            return <div className="col-md-3" key={brand.brandname}> <CirclePercentage percentage={brand.brandpercent}/><h2 className="brand-names">{brand.brandname}</h2></div>
        });

        return (
            <div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>BrandName</label>
                        <input type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Time Range</label>
                        <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Query</label>
                        <input type="text" className="form-control" id="inputZip"/>
                    </div>

                </div>
                <br/><br/>
                  <div className="row">
                      {brandsList}
                  </div>

            </div>

        );
    }
}
export default BrandStatistics;