class Fecth {
  baseUrl: string = process.env.BACKEND_URL || "";
  post;
  get;
  put;
  delete;
  constructor() {
    this.post = async (path: string, option?: RequestInit) => {
      try {
        const response = await fetch(this.baseUrl + path, {
          ...option,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return await response.json();
      } catch (error: any) {
        throw error;
      }
    };
    this.get = async (path: string, option?: RequestInit) => {
      try {
        const response = await fetch(this.baseUrl + path, {
          ...option,
          method: "GET",
        });
        const res = await response.json();
        return res;
      } catch (error: any) {
        throw error;
      }
    };
    this.put = async (path: string, option?: RequestInit) => {
      try {
        
        const response = await fetch(this.baseUrl + path, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          ...option,
        });
        return await response.json();
      } catch (error: any) {
        throw error;
      }
    };
    this.delete = async (path: string, option?: RequestInit) => {
      try {
        const response = await fetch(this.baseUrl + path, {
          method: "DELETE",
          ...option,
        });
        return await response.json();
      } catch (error: any) {
        throw error;
      }
    };
  }
}

const Fetch = new Fecth();

export default Fetch;
