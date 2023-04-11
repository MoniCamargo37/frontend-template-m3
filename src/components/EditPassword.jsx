import toast from "react-hot-toast";
import { useState } from "react";

function EditPassword({ edit, cancel }) {
  const [passwordData, setPasswordData] = useState({currentPassword: "", newPassword: "",newPasswordConfirmation: ""});
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  const handleInputChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.newPasswordConfirmation
    ) {
      toast.error("Por favor, introduzca primero su contraseña actual y después la nueva dos veces.");
      return;
    }
    if (passwordData.newPassword !== passwordData.newPasswordConfirmation) {
      toast.error("La contraseña no coincide.")
      return;
    }
    if (!passwordRegex.test(passwordData.newPassword)) {
      toast.error(
        "La contraseña debe tener al menos 6 caracteres y contener como mínimo un número, una minúscula y una mayúscula."
      );
      return;
    }
    edit(passwordData);
  };

  return (
    <div>
    <h3>Cambiar contraseña</h3>
    <form onSubmit={handleSubmit}>
      <label>Contraseña actual</label>
      <input type="password" value={passwordData.currentPassword} required onChange={handleInputChange} name="currentPassword"/>
      <label>Nueva contraseña:</label>
      <input type="password" value={passwordData.newPassword} required onChange={handleInputChange} name="newPassword" />
      <label>Confirmar la nueva contraseña:</label>
      <input type="password" value={passwordData.newPasswordConfirmation} required onChange={handleInputChange} name="newPasswordConfirmation"/>
      <button type="submit">Guardar contraseña</button>
      <button type="button" onClick={cancel}>Cancelar</button>
    </form>
    </div>
  );
}
export default EditPassword;