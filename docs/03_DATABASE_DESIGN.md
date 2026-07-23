# Database Design

## Database

MongoDB

---

# Collections

## Users

Fields

- id
- firstName
- lastName
- username
- email
- password
- avatar
- role
- skillLevel
- sports
- createdAt

---

## Venues

Fields

- id
- ownerId
- name
- description
- location
- amenities
- images
- status

---

## Courts

Fields

- venueId
- sport
- price
- capacity
- operatingHours

---

## Slots

Fields

- courtId
- date
- startTime
- endTime
- availability

---

## Bookings

Fields

- userId
- slotId
- paymentId
- bookingStatus

---

## Payments

Fields

- bookingId
- razorpayOrderId
- amount
- paymentStatus

---

## Chats

Fields

- participants
- bookingId
- lastMessage

---

## Messages

Fields

- senderId
- receiverId
- message
- timestamp

---

## Reviews

Fields

- venueId
- userId
- rating
- review

---

# Relationships

User

↓

Venue

↓

Court

↓

Slot

↓

Booking

↓

Payment

Each collection references related entities using ObjectIds.
