import React from 'react'
import {Button} from 'semantic-ui-react'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

function footer() {
    return (
        <div style={{textAlign:"center",color:"black",backgroundColor:"lightgrey"}}>
            <br/>
            <b>Made&nbsp; with &nbsp;<FontAwesomeIcon icon={faHeart} color="red" size="lg"/>&nbsp; by &nbsp;
            <a href="https://twitter.com/yashmantri20">Yash Mantri</a></b><br/><br/>
            <Button labelPosition='right'>
            <a href="https://github.com/yashmantri20"><FontAwesomeIcon icon={faGithub} size="2x"/></a>&nbsp;&nbsp;&nbsp;
            </Button>
            <Button labelPosition='right'>
            <a href="https://www.linkedin.com/in/yashmantri20/"><FontAwesomeIcon icon={faLinkedinIn} size="2x"/></a>
            </Button><p><br/></p>
        </div>
    )
}

export default footer
