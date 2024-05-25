import { Company } from "@/types/company";

type Props = {
  company: Company;
};

const SingleSalaryComment = ({ company }: Props) => {
  return (
    <div className="container">
      {company.salary_and_benefits_comments.length > 0 ? (
        company.salary_and_benefits_comments
          .slice(0, 3)
          .map((comment, index) => (
            <div
              key={index}
              className="mb-3 rounded-xl bg-white px-4 py-[20px] shadow-testimonial dark:bg-dark sm:px-[30px]"
            >
              <p className="text-gray-800 dark:text-gray-200">{comment}</p>
            </div>
          ))
      ) : (
        <p className="mt-10 text-gray-800 dark:text-gray-200">
          To podjetje še ni prejelo komentarjev.
        </p>
      )}
    </div>
  );
};

export default SingleSalaryComment;
