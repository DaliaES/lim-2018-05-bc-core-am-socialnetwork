
	window.validatesignForm=(name,email,pass)=>{
   const regEx = /\S+@\S+\.\S+/
		if (name !==''& pass!=='' & email!==''){
			console.log(name)
			return true
		} else{
			alert('Por favor Ingrese sus Datos Completos')
		}
		if (regEx.test(email)){
      return true 
		}else{
			console.log('holi')
		}
		if ( pass.length >=6){
			return true
		}else{
			console.log(pass.length)
		}
		return false
	}
	window.validateloginForm=(email,pass)=>{
  const regEx = /\S+@\S+\.\S+/
		if (pass!=='' & email!==''){
			console.log(email)
			return true
		} else{
			alert('Por favor Ingrese sus datos de registro correcto')
		}
		if (regEx.test(email)){
      return true 
		}else{
			console.log('holi')
		}
		if ( pass.length >=6){
			return true
		}else{
			console.log(pass.length)
		}
		return false
	}
