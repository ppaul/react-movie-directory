import React, { useState } from 'react'

const newMovie = { title: "", rating: 0, duration: "" };

export function MovieForm({ onAddMovie }) {
  const [movie, setMovie] = useState(newMovie);
  const [isValidDuration, setIsValidDuration] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, rating, duration } = movie;
    if (duration.length < 2 || (duration[duration.length - 1] !== 'm' && duration[duration.length - 1] !== 'h')) {
      setIsValidDuration(false);
      return;
    }

    if (!title || !rating) {
      return;
    }

    const hrsDuration = duration[duration.length - 1] === 'm' ?
      (parseFloat(duration) / 60).toLocaleString(undefined, { maximumFractionDigits: 1 }) : duration.slice(0, duration.length - 1);

    onAddMovie({ ...movie, duration: hrsDuration });
    setMovie(newMovie);
  }

  const onFieldChange = (fieldName) => (event) => {
    setIsValidDuration(null);
    setMovie({ ...movie, [fieldName]: event.target.value });
  }


  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={handleSubmit}>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Movie Name'
              value={movie.title}
              onChange={onFieldChange('title')}
              data-testid='nameInput'
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input
              type='number'
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              value={movie.rating}
              min={0}
              max={100}
              onChange={onFieldChange('rating')}
              data-testid='ratingsInput'
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input
              type='text'
              id='duration'
              placeholder='Enter duration in hours or minutes'
              value={movie.duration}
              onChange={onFieldChange('duration')}
              data-testid='durationInput'
            />
          </div>
          {isValidDuration === false && <div
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>}
          <div className='layout-row justify-content-end'>
            <button
              type='submit'
              className='mx-0'
              data-testid='addButton'
              onClick={handleSubmit}
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
