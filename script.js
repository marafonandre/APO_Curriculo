function changeContent(option) {
    var divContent = document.getElementById('content');
    
    switch (option)   {
        case 'new':
            divContent.documentElement.innerHTML= "";
    }
}