FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/*/src ./packages/*/src
COPY tsconfig.json ./

# Build
RUN pnpm build

# Copy built files to n8n custom nodes directory
RUN mkdir -p /n8n-custom-nodes
RUN cp -r packages/*/dist /n8n-custom-nodes/

# Set up n8n with custom nodes
ENV N8N_CUSTOM_EXTENSIONS=/n8n-custom-nodes
ENV N8N_HOST=0.0.0.0
ENV N8N_PORT=5678

EXPOSE 5678

CMD ["n8n"]
