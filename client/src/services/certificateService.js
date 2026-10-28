import API from "../api/api";
import { defaultCertificates } from "../data/defaultData";

const getSavedCertificates = () => {
  try {
    const saved = localStorage.getItem("portfolio_certificates");
    return saved ? JSON.parse(saved) : defaultCertificates;
  } catch {
    return defaultCertificates;
  }
};

const saveCertificates = (certs) => {
  try {
    localStorage.setItem("portfolio_certificates", JSON.stringify(certs));
  } catch {}
};

const getCertificates = async () => {
  try {
    const response = await API.get("/certificates");
    return response.data?.length ? response.data : getSavedCertificates();
  } catch (error) {
    console.warn("Using offline/fallback certificates data:", error.message);
    return getSavedCertificates();
  }
};

const getCertificate = async (id) => {
  try {
    const response = await API.get(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    const certs = getSavedCertificates();
    return certs.find((c) => c._id === id) || certs[0];
  }
};

const createCertificate = async (certData) => {
  try {
    const response = await API.post("/certificates", certData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const certs = getSavedCertificates();
    const newCert = {
      _id: "cert-" + Date.now(),
      title: certData.get ? certData.get("title") : certData.title,
      issuer: certData.get ? certData.get("issuer") : certData.issuer,
      date: certData.get ? certData.get("date") : certData.date || new Date().toISOString(),
      images: [{ url: "/certificates/photo_2026-10-27_23-32-19.jpg" }],
    };
    certs.push(newCert);
    saveCertificates(certs);
    return newCert;
  }
};

const deleteCertificate = async (id) => {
  try {
    const response = await API.delete(`/certificates/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const certs = getSavedCertificates().filter((c) => c._id !== id);
    saveCertificates(certs);
    return { success: true };
  }
};

const updateCertificate = async (id, certData) => {
  try {
    const response = await API.patch(`/certificates/${id}`, certData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    const certs = getSavedCertificates().map((c) => {
      if (c._id === id) {
        return {
          ...c,
          title: certData.get ? certData.get("title") || c.title : certData.title || c.title,
          issuer: certData.get ? certData.get("issuer") || c.issuer : certData.issuer || c.issuer,
        };
      }
      return c;
    });
    saveCertificates(certs);
    return certs.find((c) => c._id === id);
  }
};

export {
  getCertificates,
  getCertificate,
  createCertificate,
  deleteCertificate,
  updateCertificate,
};
