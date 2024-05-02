import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CompanyFilter from "@/components/AllCompanies/CompanyFilter";
import CompanyPageJobs from "@/components/AllCompanies/CompanyPageJobs";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Career Compass - Podjetja",
  description: "Vsa podjetja",
};

async function getCompanies() {
  const res = await fetch(`http://localhost:4000/company`, {
    cache: "no-store",
  });
  const companies = await res.json();

  return companies;
}

const CompaniesPage = async () => {
  const companies = await getCompanies();

  const addTodo = async (formData: FormData) => {
    "use server";
    console.log(formData);
    const todoItem = formData.get("todo");
    if (!todoItem) {
      return;
    }
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      body: JSON.stringify({
        title: todoItem,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    revalidatePath('/');

  };

  return (
    <main>
      <Breadcrumb pageName="Vsa podjetja" />
      <CompanyFilter />
      <form action={addTodo} method="POST">
        <div>
          <label htmlFor="todo">Todo</label>
          <div>
            <input
              id="todo"
              name="todo"
              type="text"
              placeholder="What needs to be done?"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit"> Add Todo</button>
        </div>
      </form>
      <CompanyPageJobs companies={companies} />
    </main>
  );
};

export default CompaniesPage;
