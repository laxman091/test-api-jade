$(function(){

 $('.btnDelete').on('click', function(e){
    var id = 1621;
    $.ajax({
    url: 'http://allcodingworld.com/api/delete_emp.php',
    method: 'post',
    //contentType: 'application/json',
    data: {'id': id},
    success: function(result) {
        // handle success
        //console.log(result);
        $(this).closest('tr').remove();
    },
    error: function(request,msg,error) {
        // handle failure
        console.log(error);
    }
});

 });

 $('.btnRegister').on('click', function(e){
var fields = $('form').serialize();
//console.log(fields);
$.post("http://allcodingworld.com/api/create_emp.php", {'data': fields}, function(result){
        $('.alert').show('fast');
        $("form").trigger("reset");
        console.log(result);

    });

 });

});