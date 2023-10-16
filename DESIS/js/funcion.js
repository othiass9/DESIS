function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}



function regiones(){

    var acc = "ListaRegiones";  
    $.ajax({
      dataType: 'json',
      type:'POST',
      url: "includes/getRegiones.php",
      async: true,
      data:{accion:acc}
    }).done(function(data){
      $("#cmb_region").empty().append('<option value="">Seleccione Región</option>');
      $.each(data, function(i, item) {
        $("#cmb_region").append("<option value=\""+i+"\">"+item+"</option>");

      });
    }).fail(function(jqXHR, textStatus, errorThrown){
      alerta('error','Error','Problema al obtener Región.');
    }); 
}


function comunas() {

    document.getElementById('cmb_comuna').disabled = false;
    idComuna = document.getElementById("cmb_region").value;

    var acc = "ListaComunas";  
    $.ajax({
      dataType: 'json',
      type:'POST',
      url: "includes/getComunas.php",
      async: true,
      data:{accion:acc,idComuna:idComuna }
    }).done(function(data){
      $("#cmb_comuna").empty().append('<option value="">Seleccione Comuna</option>');
      $.each(data, function(i, item) {
        $("#cmb_comuna").append("<option value=\""+i+"\">"+item+"</option>");

      });
    }).fail(function(jqXHR, textStatus, errorThrown){
      alerta('error','Error','Problema al obtener Comuna.');
    }); 
   
}


function candidatos(){

  var acc = "ListaCandidato";  
  $.ajax({
    dataType: 'json',
    type:'POST',
    url: "includes/getCandidatos.php",
    async: true,
    data:{accion:acc}
  }).done(function(data){
    $("#cmb_candidato").empty().append('<option value="">Seleccione Candidato</option>');
    $.each(data, function(i, item) {
      $("#cmb_candidato").append("<option value=\""+i+"\">"+item+"</option>");

    });
  }).fail(function(jqXHR, textStatus, errorThrown){
    alerta('error','Error','Problema al obtener Candidato.');
  }); 
}

var f = document.form1






function validateEmail(){
                
	// Get our input reference.
	var emailField = document.getElementById('email');
	
	// Define our regular expression.
	var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

	// Using test we can check if the text match the pattern
	if( validEmail.test(emailField.value) ){

		return true;
	}else{
		alert('Email invalido');
		return false;
	}
} 


function guardaVoto(){


  var acc = "guardaVoto";  
  if ($('input[type=checkbox]:checked').length === 0) {

      alert('Debe seleccionar al menos una opción');
  }

  var selectedItems = new Array();
  $("input[type=checkbox]:checked").each(function(){
    selectedItems.push($(this).val());

  });

  var txtNombre = $("#nombre").val();
  var txtAlias = $("#alias").val();
  var txtRut = $("#rut").val();
  var txtEmail = $("#email").val();
  var txtRegion = $("#cmb_region").val();
  var txtComuna = $("#cmb_comuna").val();
  var txtCandidato = $("#cmb_candidato").val();

  var opcion =  selectedItems.toString()

 
  $.ajax({
    dataType: 'json',
    type:'POST',
    url: "includes/insertVoto.php",
    async: true,
    data:{accion:acc, txtNombre:txtNombre, txtAlias:txtAlias,txtRut:txtRut, txtEmail:txtEmail, txtRegion:txtRegion, txtComuna:txtComuna, txtCandidato:txtCandidato, opcion:opcion}
  }).done(function(data){
console.log(data)

if(data == 1){
  alert("Rut duplicado, ya existe un voto con el Rut indicado")
}else{
  alert("Voto guardado.")
}

  }).fail(function(jqXHR, textStatus, errorThrown){
  //  alert('error');
  });


}

function cargaFunciones(){
  regiones();
  candidatos();


}
