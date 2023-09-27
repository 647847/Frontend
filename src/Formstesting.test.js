import React from 'react';
import {render,screen} from '@testing-library/react';
import {ValidationForm} from './components/pages/ValidateForm';
import {RequestForm} from './components/pages/RequestForm';
import { RenewForm } from './components/pages/RenewForm';
import { DownloadCertificateForm } from './components/pages/DownloadCertificateForm';
import { BrowserRouter } from 'react-router-dom';

test("validate form",()=>{
    render(<BrowserRouter><ValidationForm/></BrowserRouter>);
    // render(<ValidationForm/>)
    const aliasname=screen.queryAllByTestId("alias-element");
    const header=screen.queryByText(/validate your certificate/i);
    const validatebutton=screen.queryAllByTestId("button-element");
    expect(validatebutton).toBeDefined();
    expect(header).toBeDefined();
    expect(aliasname).toBeDefined();
})

test("Generate form",()=>{
    render(<BrowserRouter><RequestForm/></BrowserRouter>)
    const header=screen.queryByText(/generate/i);
    const username=screen.queryAllByTestId("username-element");
    const gendownloadbutton=screen.queryAllByTestId("gd-element");
   expect(header).toBeDefined();
   expect(username).toBeDefined();
   expect(gendownloadbutton).toBeDefined();
})
 
test("download form", () => {
    render(<BrowserRouter><DownloadCertificateForm/></BrowserRouter>);
    const title = screen.queryByText(/download your certificate/i);
    const aliasName = screen.queryAllByTestId("alias-element");
    const button = screen.queryAllByTestId("button-element");
    expect(title).toBeDefined();
    expect(aliasName).toBeDefined();
    expect(button).toBeDefined();
});

test("renew form", () => {
    render(<BrowserRouter><RenewForm/></BrowserRouter>);
    const title = screen.queryByText(/renew your certificate/i);
    const aliasName = screen.queryAllByTestId("alias-element");
    const renewYear = screen.queryAllByTestId("year-element");
    const button = screen.queryAllByTestId("button-element");
    expect(title).toBeDefined();
    expect(aliasName).toBeDefined();
    expect(renewYear).toBeDefined();
    expect(button).toBeDefined();

});