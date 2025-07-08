import RoleForm from "./components/RoleForm";
import Image from "next/image";
import bgphoto1 from "@/public/bgphoto1.png";
import savingnotes from "../public/savingnotes.jpg";
import booklover from "../public/booklover.jpg";
import loveit from "../public/loveit.jpg";
import roadmap2 from "../public/roadmap2.svg"
import BottomBar from "./components/BottomBar";
import NavBar from "./components/NavBar"

export default function Page() {
  return (
    <div className="overflow-hidden">
      <div>
        <NavBar />
       
        
<div className="relative w-full h-[60vh] bg-black overflow-hidden">
  <Image
    src={bgphoto1}
    alt="Quill writing 'Poets are the unacknowledged legislators of the world'"
    fill
    style={{ objectFit: 'contain' }}
    sizes="90vw"
  />

</div>


<div className="flex flex-col items-center text-center">
  <h2 className="text-6xl font-bold mb-12 my-8 font-playfair">Sign Up Now</h2>
  <p className="mb-8 max-w-xl ml-4 mr-4">
    Add your name to the wait list and get free credits when you log in to the app
  </p>
  <div className="w-full max-w-md border-2 border-double p-4 mb-12">
    <RoleForm />
  </div>
</div>




      </div>
      <p className="text-5xl font-bold my-10 mb-20 text-center font-playfair">How it works</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mx-6 justify-items-center">
        <div>
          <Image
            src={booklover}
            height={300}
            width={400}
            alt="image of woman reading a book"
          />
        </div>
        <div className="p-12">
       
          <h2 className="text-2xl text-center font-bold mb-8 my-4 font-playfair">
            Develop Your Project with Other Writers
          </h2>
         
        
            
     <p className="mb-4">  <strong>› </strong>Submit your work for feedback. Get high quality notes from other writers. Your project will be rated based
            on each draft, with more weight given to the last draft.</p> 
          
            <p className="mb-4">   <strong>› </strong> Your project's rating comes from a complex algorithm that, in short,
           compares the cumulative rating of the raters. The system elevates
            thoughtful critique and minimizes careless readings.</p> 
         
       
            <p>    <strong>› </strong> After feedback is delivered, each writer will be allowed to share their email. Only if both
            people opt to share contact details will each receive the other's email address.</p> 
          
        </div>

        <div className="place-content-center p-12">
      <h2 className="hidden md:block text-2xl text-center font-bold mb-8 my-4 font-playfair">Have Your Work Read by Industry Pros</h2>
          <p className="hidden md:inline-block">
        
            Once you're ready, you can select to submit your work to be read by
            verified industry professionals. They will be able to sort through
            all available work based on ratings and other options such as genre.
          </p>
        </div>
<div>
        <Image
          src={savingnotes}
          height={400}
          width={500}
          alt="image of woman saving notes"
        />
           <h2 className=" text-2xl text-center font-bold mb-8 my-4 font-playfair md:hidden">
            Develop Your Project with Other Writers
          </h2>
<p className="inline-block p-12 md:hidden"> Once you're ready, you can select to submit your work to be read by
            verified industry professionals. They will be able to sort through
            all available work based on ratings and other options such as genre.</p>
        </div>
        

        <div> 
        <Image
          src={loveit}
          height={500}
          width={500}
          alt="image of woman liking something"
        />
        </div>

        <div className="place-content-center">
         <h2 className="text-2xl text-center font-bold mb-3 my-2 font-playfair"> The Writer's List : the Yearly List of the Best Projects</h2> <p className="p-6"> Each year, the Writer's List will be published with 
          the highest-rated writing from each genre.
           This service is free for writers ... and always will be. Writing is your career.
          You shouldn't pay others so you can do your job. </p>
         </div>

      </div>

<div className="mt-20 mb-8 justify-items-center"> 
<Image 
src={roadmap2}
height={500}
width={500}
alt={"image of roadmap"}/>
<div className="my-10">
  <p className="text-center text-5xl underline mb-8 font-playfair">Development Road Map </p>
  <ul className="list-decimal list-inside leading-8 ml-3">
<li>MVP: Exchange notes; connect with writers; submit to industry pros</li>
<li>Verified badges for published/self-pubbed/WGA</li>
  <li>Forums for
      writers to discuss... everything!</li>
  <li>Register as 501(c)(3) </li>
    <li>Hold contests
      for other non-profits</li>
  </ul>
     </div>

      </div>
      
      <p className="text-center my-12 mb-12">contact us: info@thewriterslist.com</p>
      <div className="w-screen text-white bg-gray-900">
      <BottomBar /></div>
    </div>
  );
}
