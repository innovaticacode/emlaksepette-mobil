import { View, Text, StyleSheet, Image,TextInput, TouchableWithoutFeedback, Keyboard,Dimensions, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import { useRef,useState,useEffect} from 'react'


export default function PasswordVerify() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleSendCode = () => {
    setIsTimerRunning(true);
  };

  const handleTimerFinish = () => {
    setIsTimerRunning(false);
    // Zamanlayıcı bitince burada başka bir şey yapabilirsiniz
  };




  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const fourthInputRef = useRef(null);

  const handleCodeInput = (text, inputRef) => {
    if (text.length === 1 && inputRef.current) {
      inputRef.current.focus();
    }
  };

 
 

  const {width,height}=Dimensions.get("window")
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
        <View style={styles.Body}>
            <View style={{width:'100%',height:'40%',borderRadius:'50%',right:10}}>
              <Image source={require('./logo.png')} style={{width:'100%',height:'100%',tintColor:'#EA2C2E'}} resizeMode='contain' />
            </View>

            <View style={styles.Text}>
                 <Text style={{fontSize:19,fontWeight:'bold',color:'#2B3148',textAlign:'center',}}>Numaranı Doğrula</Text>
                 <Text style={{textAlign:'center',top:10,color:'#BBBFC3'}}>*********90 No'lu Numaraya gönderilen 4 haneli kodu gir</Text>
           </View>
           <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
            <View style={styles.Inputs}>
              
            <TextInput
          ref={firstInputRef}
          style={styles.codeInput}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleCodeInput(text, secondInputRef)}
        />
        <TextInput
          ref={secondInputRef}
          style={styles.codeInput}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleCodeInput(text, thirdInputRef)}
        />
        <TextInput
          ref={thirdInputRef}
          style={styles.codeInput}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleCodeInput(text, fourthInputRef)}
        />
        <TextInput
          ref={fourthInputRef}
          style={styles.codeInput}
          maxLength={1}
          keyboardType="numeric"
        />
            </View>
            </KeyboardAvoidingView>
            <View style={{alignItems:'center', paddingBottom:width>400? 10:0}}>
              <TouchableOpacity style={{width:'40%'}} onPress={handleSendCode}>
                <Text style={{textAlign:'center',fontSize:15,fontFamily:'Verdana',color:'#264ABB'}}>Yeni Kod Gönder</Text>
              </TouchableOpacity>
            </View>
            <View style={{width:'100%', alignItems:'center',top:10,justifyContent:'center'}}>
           
        <ProgressBar duration={80} onFinish={handleTimerFinish} />
     
            </View>
          <View style={{top:30,alignItems:'center'}}>
            <TouchableOpacity style={styles.BtnAccept}  >
              <Text style={{textAlign:'center',fontSize:17,fontFamily:'Verdana',color:'white'}}>Onayla</Text>
            </TouchableOpacity>
          </View>

        </View>
        
    </View>
    </TouchableWithoutFeedback>
  )
}
const {width,height}=Dimensions.get("window")
const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#F7F7F7'
        },
        Body:{
          width:'100%',
          paddingTop:60,
       
          
        },
        Text:{
         paddingTop:20,
          width:'100%',
         
        },
        Inputs:{
          display:'flex',
          justifyContent:'center',
          paddingTop:20,
          flexDirection:'row',
          gap:20,
        
        },
        codeInput: {
        padding:width>400? 20 :15,
        paddingLeft:25,
        paddingRight:25,
          fontSize:18,
          borderWidth: 1,
          borderColor: 'gray',
          textAlign: 'center',
          borderRadius:5,
          backgroundColor:'#F5F7F8',
          fontWeight:'bold',
        },
        TimeLine:{
          width:'90%',
          padding:3,
          backgroundColor:'#EA2C2E',
          borderRadius:20
        },
        BtnAccept:{
          width:'60%',
          backgroundColor:'red',
          padding:13,
          borderRadius:10
        },
        progressBar: {
          width: '80%',
          height: 10,
          backgroundColor: '#ccc',
          borderRadius: 10,
          overflow: 'hidden',
        },
        progress: {
          height: '100%',
          backgroundColor: 'red',
        },
        button: {
          fontSize: 18,
          color: 'blue',
          textDecorationLine: 'underline',
        },
})
const ProgressBar = ({ duration, onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (1 / duration);
        if (newProgress >= 1) {
          clearInterval(intervalId);
          onFinish();
          return 1;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
};