function statusChangeCallback(response){
    if (response.status === 'connected'){
        FileSystemWritableFileStream.api('/me?fields=name,email', function(response){
            console.log('Successful login for: '+ response.name);
            console.log('Email: '+ response.email);
        });
    }else {
        console.log('User not authenticated');
    }
}
