import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    justifyContent: "center",
  },
  header: {
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    color: "#333",
    fontWeight: "800",
    textAlign: "center",
  },
  instruction: {
    paddingTop: 30,
  },
  instructionText: {
    fontSize: 13,
    color: "#262020",
    fontWeight: "400",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  phoneNumber: {
    color: "red",
  },
  timerContainer: {
    paddingTop: 10,
    alignItems: "center",
  },
  timerCircle: {
    backgroundColor: "#EA2C2E",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  codeInputContainer: {
    paddingTop: 30,
  },
  codeInputRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    backgroundColor: "#ebebeb",
    borderRadius: 6,
    width: 50,
    height: 50,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  actionButtons: {
    padding: 10,
    paddingTop: 50,
    gap: 20,
  },
  submitButton: {
    backgroundColor: "#EA2A28",
    padding: 9,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: "#EA2A28",
    padding: 9,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
 modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#EA2A28',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
});
