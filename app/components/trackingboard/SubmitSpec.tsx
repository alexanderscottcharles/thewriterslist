'use client'
import React from "react";
import { useForm } from "react-hook-form";

type SubmissionFormData = {
  specTitle: string;
  logline: string;
  writers: string;
  genres: string;
  materialCategory: "Feature Film" | "TV Pilot" | "TV / Streaming Movie" | "Book (Film & TV rights)" | "";
  tvFormat?: "Half-Hour" | "Hourlong" | "Limited Series" | "";
  announcementText: string;
  repInfo?: string;
  attachments?: string;
  additionalNotes?: string;
  writerBios?: string;
  submitterFirstName: string;
  submitterLastName: string;
  submitterEmail: string;
  confirmationChecked: boolean;
};

const MATERIAL_OPTIONS = [
  "Feature Film",
  "TV Pilot",
  "TV / Streaming Movie",
  "Book (Film & TV rights)",
] as const;

const TV_FORMAT_OPTIONS = ["Half-Hour", "Hourlong", "Limited Series"] as const;

export default function SpecTrackingForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmissionFormData>({
    defaultValues: {
      materialCategory: "",
      tvFormat: "",
      confirmationChecked: false,
    },
  });

  const selectedMaterial = watch("materialCategory");

 const onSubmit = async (data: SubmissionFormData) => {
  try {
    const response = await fetch('/api/sendSubmission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send submission');
    }

    alert('Thanks! Your submission was sent.');
  } catch (error) {
    alert('There was an error sending your submission.');
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: 720,
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
      }}
      noValidate
    >
      <h1 className="text-center my-4">Submit a Spec Script for Tracking</h1>

      <p style={{ fontStyle: "italic", color: "#333" }}>
        <strong>Tracking announcements can only be submitted by  managers, agents, development executives,
       or assistants currently sending out a client's spec script. </strong> 
      </p>

      {/* Spec Title */}
      <label style={{ display: "block", marginTop: 16 }}>
        Spec Script Title <span style={{ color: '#c00' }}>*</span>
        <input
          type="text"
          {...register("specTitle", { required: "Please enter the spec title." })}
          placeholder="Enter the title of the spec script"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
        {errors.specTitle && (
          <p style={{ color: "#c00", marginTop: 4 }}>{errors.specTitle.message}</p>
        )}
      </label>

      {/* Logline */}
      <label style={{ display: "block", marginTop: 16 }}>
        Logline <span style={{ color: "#c00" }}>*</span>
        <textarea
          {...register("logline", { required: "A brief logline is required." })}
          rows={3}
          placeholder="Enter a concise, compelling logline"
          style={{ width: "100%", padding: 8, marginTop: 4, resize: "vertical" }}
        />
        {errors.logline && (
          <p style={{ color: "#c00", marginTop: 4 }}>{errors.logline.message}</p>
        )}
      </label>

      {/* Writers */}
      <label style={{ display: "block", marginTop: 16 }}>
        Writer(s) <span style={{ color: "#c00" }}>*</span>
        <input
          type="text"
          {...register("writers", {
            required: "Please list the writer(s).",
          })}
          placeholder="List writers"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
        {errors.writers && (
          <p style={{ color: "#c00", marginTop: 4 }}>{errors.writers.message}</p>
        )}
      </label>

      {/* Genres */}
      <label style={{ display: "block", marginTop: 16 }}>
        Genre(s) <span style={{ color: "#c00" }}>*</span>
        <input
          type="text"
          {...register("genres", {
            required: "Please specify one or more genres.",
          })}
          placeholder={`Use "|" to separate genres, e.g. Drama|Thriller|Comedy`}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
        {errors.genres && (
          <p style={{ color: "#c00", marginTop: 4 }}>{errors.genres.message}</p>
        )}
      </label>

      {/* Material Category */}
      <fieldset style={{ marginTop: 20 }}>
        <legend>
          Type of Material <span style={{ color: "#c00" }}>*</span>
        </legend>
        {MATERIAL_OPTIONS.map((option) => (
          <label key={option} style={{ display: "block", marginTop: 6 }}>
            <input
              type="radio"
              value={option}
              {...register("materialCategory", {
                required: "Please select the type of material.",
              })}
            />{" "}
            {option}
          </label>
        ))}
        {errors.materialCategory && (
          <p style={{ color: "#c00", marginTop: 4 }}>{errors.materialCategory.message}</p>
        )}
      </fieldset>

      {/* If TV, select format */}
      {selectedMaterial === "TV Pilot" && (
        <fieldset style={{ marginTop: 16 }}>
          <legend>TV Format (if applicable)</legend>
          {TV_FORMAT_OPTIONS.map((format) => (
            <label key={format} style={{ display: "block", marginTop: 6 }}>
              <input type="radio" value={format} {...register("tvFormat")} /> {format}
            </label>
          ))}
        </fieldset>
      )}

     

      {/* Representation Info */}
      <label style={{ display: "block", marginTop: 16 }}>
        Writer's Representation Info (Agency/Manager names only)
        <textarea
          {...register("repInfo")}
          rows={3}
          placeholder="List agency, agent, and/or management names (no bios)"
          style={{ width: "100%", padding: 8, marginTop: 4, resize: "vertical" }}
        />
      </label>

      {/* Attachments */}
      <label style={{ display: "block", marginTop: 16 }}>
        Attachments (Talent or Production)
        <textarea
          {...register("attachments")}
          rows={2}
          placeholder="List attached directors, actors, producers, etc."
          style={{ width: "100%", padding: 8, marginTop: 4, resize: "vertical" }}
        />
      </label>

      {/* Additional Notes */}
      <label style={{ display: "block", marginTop: 16 }}>
        Additional Notes
        <textarea
          {...register("additionalNotes")}
          rows={3}
          placeholder="Any other relevant info like animation, remake, pilot type, etc."
          style={{ width: "100%", padding: 8, marginTop: 4, resize: "vertical" }}
        />
      </label>

      {/* Writer Bios */}
      <label style={{ display: "block", marginTop: 16 }}>
        Writer Bio(s) (up to 500 characters)
        <textarea
          maxLength={500}
          {...register("writerBios")}
          rows={4}
          placeholder="Brief biographies of writer(s)"
          style={{ width: "100%", padding: 8, marginTop: 4, resize: "vertical" }}
        />
      </label>

      {/* Submitter Name */}
      <fieldset style={{ marginTop: 20 }}>
        <legend>
          Your Name <span style={{ color: "#c00" }}>*</span>
        </legend>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <input
            type="text"
            {...register("submitterFirstName", {
              required: "First name is required.",
            })}
            placeholder="First Name"
            style={{ flex: 1, padding: 8 }}
          />
          <input
            type="text"
            {...register("submitterLastName", {
              required: "Last name is required.",
            })}
            placeholder="Last Name"
            style={{ flex: 1, padding: 8 }}
          />
        </div>
        {(errors.submitterFirstName || errors.submitterLastName) && (
          <p style={{ color: "#c00", marginTop: 4 }}>
            {errors.submitterFirstName?.message || errors.submitterLastName?.message}
          </p>
        )}
      </fieldset>

      {/* Submitter Email */}
      <label style={{ display: "block", marginTop: 16 }}>
        Email Address <span style={{ color: "#c00" }}>*</span>
        <input
          type="email"
          {...register("submitterEmail", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
          placeholder="your.company@email.com"
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
        {errors.submitterEmail && (
          <p style={{ color: "#c00", marginTop: 4 }}>{errors.submitterEmail.message}</p>
        )}
      </label>

      <label style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <input
          type="checkbox"
          {...register("confirmationChecked", {
            required:
              "Please confirm that you are an established rep or dev exec submitting on behalf of a client.",
          })}
          style={{ marginRight: 10 }}
        />
        I confirm that I am submitting as a recognized industry representative and not as a writer submitting my own script.
      </label>
      {errors.confirmationChecked && (
        <p style={{ color: "#c00", marginTop: 4 }}>{errors.confirmationChecked.message}</p>
      )}

  
      <button
        type="submit"
        style={{
          marginTop: 24,
          padding: "12px 28px",
          fontSize: 16,
          backgroundColor: "#004080",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Send Submission
      </button>

   
    </form>
  );
}
