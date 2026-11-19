import mongoose from 'mongoose'
import validator from 'validator'

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'La reservación debe tener un nombre'],
    trim: true,
    minlength: [2, 'El nombre debe contener al menos dos letras'],
    maxlength: [80, 'El nombre debe contener menos de 80 letras']
  },
  email: {
    type: String,
    required: [true, 'La reservación debe contener un correo electrónico'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Por favor proporciona un correo electrónico valido']
  },
  phone: {
    type: String,
    required: [true, 'La reservación debe contener un número de teléfono'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'La reservación debe contener una fecha '],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe estar en formato YYYY-MM-DD']
  },
  time: {
    type: String,
    required: [true, 'La reservación debe tener una hora'],
    match: [/^\d{2}:\d{2}$/, 'La hora debe tener el formato HH:mm']
  },
  guests: {
    type: Number,
    required: [true, 'Proporcina el número de invitados'],
    min: [1, 'La reservación debe ser para al menos una persona'],
    max: [10, 'Para reservar para mas de 10 personas, por favor llama al restaurant']
  },
  specialRequest: {
    type: String,
    trim: true,
    maxlength: [300, 'La petición especial debe contener 300 caracteres o menos']
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  code: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Para buscar rápido las reservas de un día y horario
reservationSchema.index({ date: 1, time: 1 })

const Reservation = mongoose.model('Reservation', reservationSchema)

export default Reservation
