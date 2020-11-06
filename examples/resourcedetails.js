import React from 'react'

const Resourcedetails = ({resources}) => {
    return (
        <div>
            <center><h1>Resource Details</h1></center>
            {resources.map((resource) => (
                <table>
                <tr><td>Name</td><td>{resource.Name}</td></tr>
                <tr><td>Resource Group</td><td>{resource.ResourceGroup}</td></tr>
                <tr><td>Description</td><td>{resource.Description}</td></tr>
                <tr><td>Affiliation</td><td>{resource.Affiliation}</td></tr>
                <tr><td>Audience</td><td>{resource.Audience}</td></tr>
                <tr><td>Resource Type</td><td>{resource.Type}</td></tr>
                <tr><td>Keywords</td><td>{resource.Keywords}</td></tr>
                <tr><td>Tpoics</td><td>{resource.Topics}</td></tr>
                <tr><td>Quality Level</td><td>{resource.QualityLevel}</td></tr>
                <tr><td>Short Description</td><td>{resource.ShortDescription}</td></tr>
                </table>
            ))}
        </div>
    )
};

export default Resourcedetails